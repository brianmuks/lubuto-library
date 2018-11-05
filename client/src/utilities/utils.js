import Icons from '../../../lib/icons'

// get rid of icon codes
const cleanData = () => Icons.map(icon => icon.name.substring(0, icon.name.lastIndexOf(' ')))

const isIconValid = (icons, name) => icons.includes(name)

export { cleanData, isIconValid }