# s8-menu
A flexible, drag-and-drop enabled menu component for react.

This component is in testing mode and is not ready for prime-time.

### Basic menu
```JSX
import React from 'react';
import { Menu, MenuItem, DNDMenueItem } from s8-menu';

// FontAwesome must be included in your page to use these icons
const bulbIcon = <i style={{color:'#efd75f'}} className="fas fa-lightbulb"></i>;
const folderIcon = <i style={{color:'lightblue'}} className="fas fa-folder"></i>;
const folderOpenIcon = <i style={{color:'lightblue'}} className="fas fa-folder-open"></i>;

const MyMenu = ()=>
      <Menu>
        <MenuItem icon={folderIcon}
                  openIcon={folderOpenIcon}
                  backgroundColor={'#e1f1ff'}
                  textColor={'green'}
                  title="Folder"
                  onItemClick={()=>console.log('item click')}
                  onIconClick={()=>console.log('icon click')}
        >
          <MenuItem icon={bulbIcon} title={'Scene1'}/>
          <MenuItem icon={bulbIcon} title={'Scene2'}/>
          <MenuItem icon={bulbIcon} title={'Scene3'}/>
        </MenuItem>
        <MenuItem icon={bulbIcon} title={'Scene4'}/>
        <MenuItem icon={bulbIcon} title={'Scene5'}/>
      </Menu>
```


### Drag & Drop Menu
```JSX
import React from 'react';
import { Menu, MenuItem, DNDMenueItem } from s8-menu';
import HTML5Backend from 'react-dnd-html5-backend';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

// FontAwesome must be included in your page to use these icons
const bulbIcon = <i style={{color:'#efd75f'}} className="fas fa-lightbulb"></i>;
const folderIcon = <i style={{color:'lightblue'}} className="fas fa-folder"></i>;
const folderOpenIcon = <i style={{color:'lightblue'}} className="fas fa-folder-open"></i>;

const MyMenu = ()=>
    <DragDropContextProvider backend={HTML5Backend}> <!-- This should happen at the root level ofyour app -->
      <Menu>
        <DNDMenueItem icon={folderIcon} dropTypes={[NativeTypes.FILE, 'media','action', NativeTypes.TEXT, NativeTypes.URL]} onDropped={()=>console.log('dropped')} openIcon={folderOpenIcon} title="Accepts Anything">

          <DNDMenueItem icon={bulbIcon} title={'Scene3'}/>
          <DNDMenueItem icon={folderIcon} dropTypes={[NativeTypes.FILE, 'media', NativeTypes.TEXT, NativeTypes.URL]} onDropped={item=>console.log(item)} openIcon={folderOpenIcon} title="Nested Droppable"/>
          <DNDMenueItem icon={folderIcon} openIcon={folderOpenIcon} title="Deep Folder">
            <DNDMenueItem icon={bulbIcon} title={'Scene6'}/>
            <DNDMenueItem icon={bulbIcon} title={'Scene7'}/>
            <DNDMenueItem icon={bulbIcon} title={'Scene8'}/>
          </DNDMenueItem>
        </DNDMenueItem>
        <DNDMenueItem icon={bulbIcon} dragType={''} dropTypes={NativeTypes.TEXT}  onDrop={()=>console.log('Text dropped')} title={'Drop Text Here'}/>
        <DNDMenueItem icon={bulbIcon} css={'&:hover{background-color: green}'} title={'Scene4'}/>
        <DNDMenueItem icon={bulbIcon} dragType={'media'} payload={5} title={'Scene5'}/>
        <DNDMenueItem icon={bulbIcon} dragType={'action'} cuelist={5} cue={4} payload={1} title={'Scene5'}/>
      </Menu>
    <DragDropContextProvider backend={HTML5Backend}>
```


### Custom Render Function
```JSX
import React from 'react';
import { Menu, MenuItem, DNDMenueItem } from s8-menu';

// FontAwesome must be included in your page to use these icons
const bulbIcon = <i style={{color:'#efd75f'}} className="fas fa-lightbulb"></i>;

const cuelistRenderer = ({title,icon, cuelist, cue, onPlay})=>
    <div style={{marginBottom:12,paddingBottom:8, display:'flex', borderBottom: '1px solid #EEE'}}>
      <div style={{fontSize: 32, color: '#d0cc2a', paddingRight:8}} onClick={()=>onPlay()}>{icon}</div>
      <div>
        {title}
         <br/>
         <span style={{fontSize: '.8em', color: '#888'}}>QL:{cuelist}/ Q:{cue}</span>
      </div>
    </div>;

const MyMenu = ()=>
    <Menu>
        <MenuItem icon={bulbIcon} cuelist={5} cue={4} payload={1} render={cuelistRenderer} onPlay={()=>console.log('playing')} title={'Scene5'}/>
        <MenuItem icon={bulbIcon} cuelist={5} cue={3} payload={1} render={cuelistRenderer} title={'Scene4'}/>
        <MenuItem icon={bulbIcon} cuelist={5} cue={2} payload={1} render={cuelistRenderer} title={'Scene3'}/>
        <MenuItem icon={bulbIcon} cuelist={5} cue={1} payload={1} render={cuelistRenderer} title={'Scene2'}/>
    </Menu>
```


