import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Menu, MenuItem } from '../';

const bulbIcon = <i className="fas fa-lightbulb"></i>;
const folderIcon = <i className="far fa-folder"></i>;
const folderOpenIcon = <i className="far fa-folder-open"></i>;

storiesOf('Menu', module)
  .add('uncontrolled', () =>
    <Menu>
      <MenuItem icon={folderIcon} openIcon={folderOpenIcon} title="Folder1">
        <MenuItem icon={bulbIcon} title={'Scene1'}/>
        <MenuItem icon={bulbIcon} title={'Scene2'}/>
        <MenuItem icon={bulbIcon} title={'Scene3'}/>
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
    );
