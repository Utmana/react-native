module.exports = {
  10 : '10 minuter',
  30 : '30 minuter',
  60 : 'en timme',
  120 : 'två timmar',
  300 : 'fem timmar',
  1440 : 'ett dygn',
  10080 : 'en vecka',
  shorten(val) {
  	if (!val) return '-';
  	if (val < 60) return val + 'm';
  	if (val < 1440) return (~~(val / 60)) + 'h';
  	return (~~(val / 1440)) + 'd';
  }
}