const config = {
  towers: [
    {
      label: '哨塔',
      value: 'sentry',
    },
    {
      label: '散弹塔',
      value: 'scatter',
    },
    {
      label: '炮塔',
      value: 'turret',
    },
    {
      label: '镶嵌塔',
      value: 'magic',
    },
    {
      label: '墙',
      value: 'wall',
    },
  ],
  tower: {
    sentry: {
      maxLevel: 100,
    },
    scatter: {
      maxLevel: 100,
    },
    turret: {
      maxLevel: 100,
    },
    magic: {
      maxLevel: 50,
    },
    wall: {
      maxLevel: 1,
    },
  },
}

export default config
