const treeData = [
  {
    name: 'Artificial Intelligence',

    children: [
      {
        name: 'Engine Intelligence'
      },
      {
        name: 'Engine Intelligence',
        extendFurther: true,
        children: [
          {
            name: 'Neuro-like networks',
            children: [
              {
                name: ''
              },
              {
                name: 'Heuristic modeling'
              }
            ]
          },
          {
            name: 'Heuristic Programming',
            children: [
              {
                name: 'Heuristic modeling'
              },
              {
                name: ''
              }
            ]
          }
        ]
      }
    ]
  }
];

export { treeData };
