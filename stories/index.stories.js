import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Menu, MenuItem, DNDMenueItem } from '../';
const bulbIcon = <i className="fas fa-lightbulb"></i>;
const folderIcon = <i className="far fa-folder"></i>;
const folderOpenIcon = <i className="far fa-folder-open"></i>;

const DragDropDecorator = (story) => {
  return (
      <DragDropContextProvider backend={HTML5Backend}>
        {story()}
      </DragDropContextProvider>
  );
};
storiesOf('Menu', module)
  .add('uncontrolled', () =>
    <Menu>
      <MenuItem icon={folderIcon} openIcon={folderOpenIcon} title="Folder1">
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
    .add('controlled', ()=>
        <Menu>
          <MenuItem icon={folderIcon}  open={true} openIcon={folderOpenIcon} title="Folder1">
            <MenuItem icon={bulbIcon} title={'Scene1'}/>
            <MenuItem icon={bulbIcon} title={'Scene2'}/>
            <MenuItem icon={bulbIcon} title={'Scene3'}/>
          </MenuItem>
          <MenuItem icon={bulbIcon} title={'Scene4'}/>
          <MenuItem icon={bulbIcon} title={'Scene5'}/>
        </Menu>
    )

storiesOf('Drag and Drop Menu', module)
    .addDecorator(DragDropDecorator)
    .add('DND Menu', () =>
        <div>
          <Menu>
            <DNDMenueItem icon={folderIcon} dropTypes={NativeTypes.FILE} onDrop={action('File dropped')} openIcon={folderOpenIcon} title="Folder1">
              <DNDMenueItem icon={bulbIcon} title={'Scene2'}/>
              <DNDMenueItem icon={bulbIcon} title={'Scene3'}/>
              <DNDMenueItem icon={folderIcon} openIcon={folderOpenIcon} title="Deep Folder">
                <DNDMenueItem icon={bulbIcon} title={'Scene6'}/>
                <DNDMenueItem icon={bulbIcon} title={'Scene7'}/>
                <DNDMenueItem icon={bulbIcon} title={'Scene8'}/>
              </DNDMenueItem>
            </DNDMenueItem>
            <DNDMenueItem icon={bulbIcon}  dropTypes={NativeTypes.TEXT} onDrop={action('Text dropped')} title={'Drop Text Here'}/>
            <DNDMenueItem icon={bulbIcon} css={'&:hover{background-color: green}'} title={'Scene4'}/>
            <DNDMenueItem icon={bulbIcon} title={'Scene5'}/>
          </Menu>
        </div>
    );
