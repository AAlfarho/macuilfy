import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SongIndexContainer from '../songs/song_index_container';
import UserMini from '../user/user_mini';
import {
  SEARCH_COLLECTION
} from '../../util/constants';
const UserSongTabs = (props) => {
    const searchCollection= {
      name: 'Search'
    };
    return(
      <Tabs className="vbox tab-flex-container">
          <TabList className="hbox tab-title-flex-container">
              <Tab className="vbox tab-title-item">Songs</Tab>
              <Tab className="vbox tab-title-item">User</Tab>
          </TabList>
        <div className="result-tab-panel-flex">
          <TabPanel className="songs-result-tab">
            <SongIndexContainer
              collectionType={SEARCH_COLLECTION}
              songs={props.songs}
              showDelete={false}
              collection={searchCollection}
              />
          </TabPanel>
          <TabPanel className="users-result-tab">
            {
              props.users.map(user => <UserMini user={user} />)
            }
          </TabPanel>
        </div>
      </Tabs>
    );
};

export default UserSongTabs;
