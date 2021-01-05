import React from 'react';
import { Image, Dimensions, StyleSheet, Text, View } from 'react-native';

import { Container, Header, Body, Content, Section } from './styles';

const { width, height } = Dimensions.get("window");

const BackgroundUi = ({children}) => {
  return (
    <View style={{flex: 1}}>
      <Container>
        <Image source={require('../../Images/background.png')} style={styles.image} />
        <Header>
          <Image source={require('../../Images/background.png')} style={styles.image} />
          <Body>
            <Content>
              {children}
            </Content>
          </Body>
        </Header>
      </Container>
    </View>
  );
}

export default BackgroundUi;

const styles = StyleSheet.create({
  image: {
    height: 0.2 * height,
    width: width,
    borderBottomRightRadius: 90
  },
})