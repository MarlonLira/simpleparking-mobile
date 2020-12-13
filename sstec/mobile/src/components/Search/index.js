// import React from 'react';
// import {
//   Platform,
//   View,
// } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const Search = () => {
//   return (
//       <GooglePlacesAutocomplete
//         placeholder="Pra onde?"
//         onPress={(data, details = null) => {
//           console.log(data, details);
//         }}
//         query={{
//           key: "AIzaSyB8C6ha7nL1IPG4-QmdhzeJifEaBJhzKWc",
//           language: "pt-BR",
//         }}
//         textInputProps={{
//           autoCapitalize: "none",
//           autoCorrect: false,
//         }}
//         fetchDetails
//         requestUrl={{
//           useOnPlatform: "all", // or "all"
//           url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api", // or any proxy server that hits https://maps.googleapis.com/maps/api
//         }}
//         enablePoweredByContainer={false}
//         styles={{
//           container: {
//             position: 'absolute',
//             top: Platform.select({ ios: 60, android: 40 }),
//             width: "100%",
//           },
//           textInputContainer: {
//             flex: 1,
//             backgroundColor: '#fff',
//             height: 54,
//             marginHorizontal: 20,
//             borderTopWidth: 0,
//             borderBottomWidth: 0,
//           },
//           textInput: {
//             height: 54,
//             margin: 0,
//             borderRadius: 0,
//             paddingTop: 0,
//             paddingBottom: 0,
//             paddingLeft: 20,
//             paddingRight: 20,
//             marginTop: 0,
//             marginLeft: 0,
//             marginRight: 0,
//             elevation: 5,
//             shadowColor: '#000',
//             shadowOpacity: 0.1,
//             shadowOffset: { x: 0, y: 0 },
//             shadowRadius: 15,
//             borderWidth: 1,
//             borderColor: '#ddd'
//           },
//           listView: {
//             borderWidth: 1,
//             borderColor: '#DDD',
//             backgroundColor: '#FFF',
//             marginHorizontal: 20,
//             elevation: 5,
//             shadowColor: '#000',
//             shadowOpacity: 0.1,
//             shadowOffset: { x: 0, y: 0 },
//             shadowRadius: 15,
//             borderWidth: 1,
//             borderColor: '#ddd',
//             marginTop: 10,
//             minHeight: 100,
//           },
//           description: {
//             fontSize: 16,
//             color: '#000'
//           },
//           row: {
//             padding: 20,
//             height: 58,
//           }
//         }}
//       />
//   );
// }

// export default Search;