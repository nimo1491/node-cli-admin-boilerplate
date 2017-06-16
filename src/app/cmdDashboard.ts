import { MgtEntity } from './MgtEntity';
import * as blessed from 'blessed';
import * as contrib from 'blessed-contrib';
import * as chalk from 'chalk';

interface IDashboardOptions {
  n: string;
  i: string;
  u: string;
  p: string;
}

export async function cmdDashboard(options: IDashboardOptions) {
  const mgtEntity = new MgtEntity(options.n, options.i, options.u, options.p);
  const maxPower: number = 300;

  // Login first
  try {
    await mgtEntity.login();
  } catch (error) {
    return console.error(error);
  }

  // Start creating dashboard
  const screen = blessed.screen();
  const grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen,
  });

  // Line chart for temperature
  const inletTempLine = {
    title: 'Inlet',
    style: { line: 'magenta' },
    x: ['12s', '9s', '6s', '3s', '0s'],
    y: [0, 0, 0, 0, 0],
  };

  const outletTempLine = {
    title: 'Outlet',
    style: { line: 'yellow' },
    x: ['12s', '9s', '6s', '3s', '0s'],
    y: [0, 0, 0, 0, 0],
  };

  const tempLine = grid.set(0, 0, 6, 6, contrib.line, {
    // showNthLabel: 10,
    label: 'Temperature (˚C)',
    showLegend: true,
    legend: { width: 12 },
  });

  tempLine.setData([inletTempLine, outletTempLine]);

  // Bar chart for power comsumption
  const powerSensors: string[] = ['SYS', 'CPU', 'MEM', 'FANBP', 'HDDBP'];
  const powerBar = grid.set(4, 6, 4, 6, contrib.bar, {
    label: 'Power (Watts)',
    barWidth: 5,
    barSpacing: 10,
    xOffset: 5,
    maxHeight: 150,
    barBgColor: 'blue',
    barFgColor: 'black',
  });

  // Power usage
  let powerUseRate: number = 0;
  const powerUsageGauge = grid.set(2, 6, 2, 3, contrib.gauge, {
    label: 'Power Usage',
    stroke: 'cyan',
    fill: 'black',
  });

  // Update temperature, power, and power usage
  setInterval(async () => {
    const sensorInfo = await mgtEntity.getSensorInfo();
    const newPowerData: number[] = [];

    // Power: need to follow the sequence: [0]: SYS, [1]: CPU, [2]: MEM, [3]: FANBP, [4]: HDDBP
    for (const sensor of sensorInfo) {
      if (sensor.name === 'SYS_POWER') {
        newPowerData[0] = sensor.reading;
        // Power usage
        powerUseRate = Math.floor((sensor.reading / maxPower) * 100);
      }
      if (sensor.name === 'CPU_POWER') {
        newPowerData[1] = sensor.reading;
      }
      if (sensor.name === 'MEMORY_POWER') {
        newPowerData[2] = sensor.reading;
      }
      if (sensor.name === 'FAN_BP_POWER') {
        newPowerData[3] = sensor.reading;
      }
      if (sensor.name === 'HDD_BP_POWER') {
        newPowerData[4] = sensor.reading;
      }

      // Temperature
      if (sensor.name === 'SYS_INLET_TEMP') {
        inletTempLine.y.shift();
        inletTempLine.y.push(sensor.reading);
      }
      if (sensor.name === 'SYS_OUTLET_TEMP') {
        outletTempLine.y.shift();
        outletTempLine.y.push(sensor.reading);
      }
    }
    powerBar.setData({ titles: powerSensors, data: newPowerData });
    tempLine.setData([inletTempLine, outletTempLine])

    let color = 'cyan';
    if (powerUseRate > 70) {
      color = 'yellow';
    }
    if (powerUseRate > 90) {
      color = 'red';
    }
    powerUsageGauge.setStack([{ percent: powerUseRate, stroke: color }]);

    screen.render();
  }, 2000);

  // Fan duty
  const fanDutyDonut = grid.set(6, 0, 6, 6, contrib.donut, {
    label: 'Fan Duty',
    radius: 12,
    arcWidth: 3,
    yPadding: 1,
    data: [
      { label: 'Fan 1', percent: 0 },
      { label: 'Fan 2', percent: 0 },
      { label: 'Fan 3', percent: 0 },
      { label: 'Fan 4', percent: 0 },
      { label: 'Fan 5', percent: 0 },
    ],
  });

  setInterval(async () => {
    const fanDutyData = await mgtEntity.getFanDuty();
    const colorList = {
      fan1Duty: 'cyan',
      fan2Duty: 'cyan',
      fan3Duty: 'cyan',
      fan4Duty: 'cyan',
      fan5Duty: 'cyan',
    }

    for (const key in fanDutyData) {
      if (fanDutyData[key] > 70) {
        colorList[key] = 'yellow';
      }
      if (fanDutyData[key] > 90) {
        colorList[key] = 'red';
      }
    }

    fanDutyDonut.setData([
      { percent: fanDutyData.fan1Duty, label: 'Fan 1', color: colorList.fan1Duty },
      { percent: fanDutyData.fan2Duty, label: 'Fan 2', color: colorList.fan2Duty },
      { percent: fanDutyData.fan3Duty, label: 'Fan 3', color: colorList.fan3Duty },
      { percent: fanDutyData.fan4Duty, label: 'Fan 4', color: colorList.fan4Duty },
      { percent: fanDutyData.fan5Duty, label: 'Fan 5', color: colorList.fan5Duty },
    ]);

    screen.render();
  }, 2000);

  // Login user
  const userLcd = grid.set(0, 6, 2, 3, blessed.text, {
    fg: 'blue',
    label: 'Login User',
    valign: 'middle',
    content: `You are logged in as ${chalk.bold(options.u)}`,
  });

  // Server status
  const chassisStatus = await mgtEntity.getChassisStatus();
  const uptime = await mgtEntity.getUptime();
  const uptimeStr: string = `${Math.floor(uptime.poh_counter_reading / 24)} d ` +
    `${uptime.poh_counter_reading % 24} hrs`;
  let powerStatusStr: string;

  if (chassisStatus.power_status === 0) {
    powerStatusStr = 'Off'
  } else {
    powerStatusStr = 'On'
  }

  const serverStatusBox = grid.set(2, 9, 2, 3, blessed.text, {
    label: 'Server Status',
    valign: 'middle',
    fg: 'magenta',
    content: `${chalk.bold('Power Status:')} ${powerStatusStr}\n` +
      `${chalk.bold('Up Time:')} ${uptimeStr}`,
  });

  // Firmware information
  const firmwareInfo = await mgtEntity.getFirmwareInfo();
  const firmwareInfoBox = grid.set(0, 9, 2, 3, blessed.text, {
    label: 'Firmware Information',
    valign: 'middle',
    fg: 'blue',
    content: `${chalk.bold('Version:')} ${firmwareInfo.fw_ver}\n` +
      `${chalk.bold('Date:')} ${firmwareInfo.date} ${firmwareInfo.time}`,
  });

  // System event log
  const eventList = await mgtEntity.getEventList();
  const eventTable =  grid.set(8, 6, 4, 6, contrib.table, {
    keys: true,
    fg: 'red',
    selectedFg: 'black',
    selectedBg: 'yellow',
    label: 'System Event Log',
    columnSpacing: 1,
    columnWidth: [4, 18, 14, 48],
  });

  const eventData: (string | number)[][] = [];
  for (const log of eventList) {
    const entry = [
      log.id,
      log.sensor_name.toLowerCase().replace(/_/g, ' '),
      log.event_direction.toLowerCase(),
      log.event_description.toLowerCase().replace(/_/g, ' '),
    ];
    eventData.push(entry);
  }

  eventTable.setData({
    headers: ['ID', 'Sensor Name', 'Direction', 'Description'],
    data: eventData,
  });
  eventTable.focus();

  // Logout when exit the program
  screen.key(['escape', 'q', 'C-c'], async (ch, key) => {
    try {
      await mgtEntity.logout();
    } catch (error) {
      return error;
    }

    return process.exit(0);
  });

  screen.on('resize', function() {
    fanDutyDonut.emit('attach');
    powerUsageGauge.emit('attach');
    serverStatusBox.emit('attach');
    powerBar.emit('attach');
    firmwareInfoBox.emit('attach');
    tempLine.emit('attach');
    eventTable.emit('attach');
    userLcd.emit('attach');
  });

  screen.render();
}
