import React from 'react';
import { Text } from 'react-native';

const Icon = ({ name, size = 20 }) => {
  const icons = {
    folder: '📁',
    file: '📄',
    back: '◀',
    add: '＋',
    trash: '🗑',
    edit: '✏️',
    info: 'ℹ️',
    save: '💾',
    close: '✕',
    home: '🏠',
    storage: '💿',
  };

  return <Text style={{ fontSize: size }}>{icons[name] || '•'}</Text>;
};

export default Icon;