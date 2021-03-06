import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../src/contexts/auth';
import { useSelector } from 'react-redux';

export default function DrawerComponent(props) {

  const [photo, setPhoto] = useState(null);

  const { user, signOut } = useContext(AuthContext);
  const { scheduling, profile } = useSelector(state => state);

  useEffect(() => {
    setPhoto(profile.photoProfile);
  }, [profile.photoProfile]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: photo,
                }}
                size={50}
              />
              <View>
                <Title style={styles.title}> {user.name} </Title>
                <Caption style={styles.caption}> {user.email} </Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>

              </View>
            </View>
          </View>

          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="map"
                  color={color}
                  size={size}
                />
              )}
              label="Mapa"
              onPress={() => { props.navigation.navigate('openScree') }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Perfil"
              onPress={() => { props.navigation.navigate('Profile') }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DrawerItem
                icon={({ color, size }) => (
                  <>
                    <Icon
                      name="calendar"
                      color={color}
                      size={size}
                    />

                  </>
                )}
                label="Agendamentos"
                onPress={() => { props.navigation.navigate('SchedulingList') }}
              />
              {
                scheduling.notification ?
                  <Icon name='circle' color="#59578e" size={19} />
                : null
              }
            </View>
          </Drawer.Section>

        </View>

      </DrawerContentScrollView>
      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={() => { signOut() }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});