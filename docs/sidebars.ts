import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  guideSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Part I: Foundation and Building Blocks',
      collapsible: true,
      collapsed: false,
      items: [
        'chapter1',
        'chapter2',
        'chapter3',
        'chapter4',
      ],
    },
    {
      type: 'category',
      label: 'Part II: The Data Engineering Lifecycle in Depth',
      collapsible: true,
      collapsed: false,
      items: [
        'chapter5',
        'chapter6',
        'chapter7',
        'chapter8',
        'chapter9',
      ],
    },
    {
      type: 'category',
      label: 'Part III: Security, Privacy, and the Future',
      collapsible: true,
      collapsed: false,
      items: [
        'chapter10',
        'chapter11',
      ],
    },
  ],
};

export default sidebars;
