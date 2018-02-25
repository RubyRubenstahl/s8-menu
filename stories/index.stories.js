import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Menu, MenuItem, DNDMenueItem } from '../';
const bulbIcon = <i style={{color:'#efd75f'}} className="fas fa-lightbulb"></i>;
const folderIcon = <i style={{color:'lightblue'}} className="fas fa-folder"></i>;
const folderOpenIcon = <i style={{color:'lightblue'}} className="fas fa-folder-open"></i>;


const DragDropDecorator = (story) => {
  return (
      <DragDropContextProvider backend={HTML5Backend}>
        {story()}
      </DragDropContextProvider>
  );
};
storiesOf('Menu', module)
  .add('basic', () =>
    <Menu>
      <MenuItem icon={folderIcon}
                openIcon={folderOpenIcon}
                title="Folder"
       >
        <MenuItem icon={bulbIcon} title={'Scene1'}/>
        <MenuItem icon={bulbIcon} title={'Scene2'}/>
        <MenuItem icon={bulbIcon} title={'Scene3'}/>
        <MenuItem icon={folderIcon} openIcon={folderOpenIcon} title="Deep Folder">
          <MenuItem icon={bulbIcon} title={'Scene6'}/>
          <MenuItem icon={bulbIcon} title={'Scene7'}/>
          <MenuItem icon={bulbIcon} title={'Scene8'}/>
        </MenuItem>
      </MenuItem>
      <MenuItem icon={bulbIcon} title={'Scene4'}/>
      <MenuItem icon={bulbIcon} title={'Scene5'}/>
    </Menu>
      )
    .add('initiallyOpen',() =>
      <Menu>
        <MenuItem icon={folderIcon}initiallyOpen={true} openIcon={folderOpenIcon} title="Folder1">
          <MenuItem icon={bulbIcon} title={'Scene1'}/>
          <MenuItem icon={bulbIcon} title={'Scene2'}/>
          <MenuItem icon={bulbIcon} title={'Scene3'}/>
        </MenuItem>
        <MenuItem icon={bulbIcon} title={'Scene4'}/>
        <MenuItem icon={bulbIcon} title={'Scene5'}/>
      </Menu>
    )
    .add('styled',() =>
      <Menu>
        <MenuItem icon={folderIcon}
                  openIcon={folderOpenIcon}
                  backgroundColor={'#e1f1ff'}
                  textColor={'green'}
                  title="Folder"
                  onItemClick={action('item click')}
                  onIconClick={action('icon click')}
        >
          <MenuItem icon={bulbIcon} title={'Scene1'}/>
          <MenuItem icon={bulbIcon} title={'Scene2'}/>
          <MenuItem icon={bulbIcon} title={'Scene3'}/>
        </MenuItem>
        <MenuItem icon={bulbIcon} title={'Scene4'}/>
        <MenuItem icon={bulbIcon} title={'Scene5'}/>
      </Menu>
    )
    .add('default icon', () =>
        <Menu>
          <MenuItem title="Deep Folder">
            <MenuItem icon={bulbIcon} title={'Scene1'}/>
            <MenuItem icon={bulbIcon} title={'Scene2'}/>
            <MenuItem icon={folderIcon} openIcon={folderOpenIcon} title="Deep Folder">
              <MenuItem icon={bulbIcon} title={'Scene6'}/>
              <MenuItem icon={bulbIcon} title={'Scene7'}/>
              <MenuItem icon={bulbIcon} title={'Scene8'}/>
            </MenuItem>
          </MenuItem>
          <MenuItem icon={bulbIcon} title={'Scene4'}/>
          <MenuItem icon={bulbIcon} title={'Scene5'}/>
        </Menu>
    )
    .add('click handlers', () =>
    <Menu>
      <MenuItem title="Click Me"
                onItemClick={action('item click')}
                onIconClick={action('icon click')}
      >
        <MenuItem icon={bulbIcon} title={'Scene1'}/>
        <MenuItem icon={bulbIcon} title={'Scene2'}/>
        <MenuItem icon={folderIcon} openIcon={folderOpenIcon} title="Deep Folder">
          <MenuItem icon={bulbIcon} title={'Scene6'}/>
          <MenuItem icon={bulbIcon} title={'Scene7'}/>
          <MenuItem icon={bulbIcon} title={'Scene8'}/>
        </MenuItem>
      </MenuItem>
      <MenuItem icon={bulbIcon} title={'Scene4'}/>
      <MenuItem icon={bulbIcon} title={'Scene5'}/>
    </Menu>
);

storiesOf('Drag and Drop Menu', module)
    .addDecorator(DragDropDecorator)
    .add('DND Menu', () =>
        <div>
          <Menu>
            <DNDMenueItem icon={folderIcon} dropTypes={[NativeTypes.FILE, 'media','action', NativeTypes.TEXT, NativeTypes.URL]} onDropped={action('dropped')} openIcon={folderOpenIcon} title="Accepts Anything">

              <DNDMenueItem icon={bulbIcon} title={'Scene3'}/>
              <DNDMenueItem icon={folderIcon} dropTypes={[NativeTypes.FILE, 'media', NativeTypes.TEXT, NativeTypes.URL]} onDropped={item=>console.log(item)} openIcon={folderOpenIcon} title="Nested Droppable"/>
              <DNDMenueItem icon={folderIcon} openIcon={folderOpenIcon} title="Deep Folder">
                <DNDMenueItem icon={bulbIcon} title={'Scene6'}/>
                <DNDMenueItem icon={bulbIcon} title={'Scene7'}/>
                <DNDMenueItem icon={bulbIcon} title={'Scene8'}/>
              </DNDMenueItem>
            </DNDMenueItem>
            <DNDMenueItem icon={bulbIcon} dragType={''} dropTypes={NativeTypes.TEXT}  onDrop={action('Text dropped')} title={'Drop Text Here'}/>
            <DNDMenueItem icon={bulbIcon} css={'&:hover{background-color: green}'} title={'Scene4'}/>
            <DNDMenueItem icon={bulbIcon} dragType={'media'} payload={5} title={'Scene5'}/>
            <DNDMenueItem icon={bulbIcon} dragType={'action'} cuelist={5} cue={4} payload={1} title={'Scene5'}/>
          </Menu>
        </div>
    );


const cuelistRenderer = ({title,icon, cuelist, cue, onPlay})=>
    <div style={{marginBottom:12,paddingBottom:8, display:'flex', borderBottom: '1px solid #EEE'}}>
      <div style={{fontSize: 32, color: '#d0cc2a', paddingRight:8}} onClick={()=>onPlay()}>{icon}</div>
      <div>
      {title}
      <br/>
      <span style={{fontSize: '.8em', color: '#888'}}>QL:{cuelist}/ Q:{cue}</span>
      </div>
    </div>;

storiesOf('Custom Render', module)
    .addDecorator(DragDropDecorator)
    .add('DND Menu', () =>
        <div>
          <Menu>
            <DNDMenueItem icon={bulbIcon} dragType={'action'} cuelist={5} cue={4} payload={1} render={cuelistRenderer} onPlay={action('playing')} title={'Scene5'}/>
            <DNDMenueItem icon={bulbIcon} dragType={'action'} cuelist={5} cue={3} payload={1} render={cuelistRenderer} title={'Scene4'}/>
            <DNDMenueItem icon={bulbIcon} dragType={'action'} cuelist={5} cue={2} payload={1} render={cuelistRenderer} title={'Scene3'}/>
            <DNDMenueItem icon={bulbIcon} dragType={'action'} cuelist={5} cue={1} payload={1} render={cuelistRenderer} title={'Scene2'}/>
          </Menu>
        </div>
    );


