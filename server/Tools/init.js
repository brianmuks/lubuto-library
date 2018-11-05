// initialize icons
import { Tools } from '../../lib/Collections'
import Icons from '../../lib/icons'


const cleanData = () => Icons.map(icon => icon.name.substring(0, icon.name.lastIndexOf(' ')))
const isIconValid = (icons, name) => icons.includes(name)

// avoiding having empty icons
function initializeIcons(){
    const cleanIcons= cleanData()
}


export { initializeIcons }
