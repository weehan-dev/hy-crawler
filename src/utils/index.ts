export default {
  dataConverter: (type: string): string => {
    switch (type) {
      case '조식':
        return 'breakfast';
      case '중식    ':
        return 'lunch';
      case '석식':
        return 'dinner';
      case '중식/석식':
        return 'lunch/dinner';
      case '분식':
        return 'snack';
    }
  }
};
