// initialize icons
import { Tools } from '../../lib/Collections'
import Icons from '../../lib/icons'


const cleanData = () => Icons.map(icon => icon.name.substring(0, icon.name.lastIndexOf(' ')))

// avoiding having empty icons
function initializeIcons(){
    const cleanIcons= cleanData() // 
    if (Tools.find({}).count() <= 0) {
        return cleanIcons.map(name => Tools.insert({name}))
    }
}

export { initializeIcons }
