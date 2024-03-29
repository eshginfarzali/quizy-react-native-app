import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { openDatabase } from 'react-native-sqlite-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const db = openDatabase({
  name: 'rn_sqlite',
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageBackground = require('../assets/images/background.png');
const arrowleft = require('../assets/icons/arrowleft.png');

type RootStackParamList = {
  Home: undefined;
  Ranking: undefined;
};

type RankingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Ranking'>;

export const RankingScreen = () => {
  const navigation = useNavigation<RankingScreenNavigationProp>();
  const [lastUserInitial, setLastUserInitial] = useState('');
  const [userList, setUserList] = useState<string[]>([]);
  const correctAnswersCount = useSelector((state: RootState) => state.correctAnswers.count);
  const score = correctAnswersCount * 10;

  useEffect(() => {
    getLastAddedUserName()
      .then((lastUserName) => {
        if (lastUserName && typeof lastUserName === 'string' && lastUserName.length > 0) {
          const initial = lastUserName.charAt(0).toUpperCase();
          setLastUserInitial(initial);
        } else {
          setLastUserInitial('E');
        }
      })
      .catch(() => {
        setLastUserInitial('E');
      });

    (async () => {
      try {
        const dbInstance = await db;
        dbInstance.transaction((tx) => {
          tx.executeSql(
            'SELECT name FROM users ORDER BY name DESC',
            [],
            (_, results) => {
              const names: string[] = [];
              for (let i = 0; i < results.rows.length; i++) {
                names.push(results.rows.item(i)?.name || '');
              }
              setUserList(names.reverse());
            },
            (_, error) => {
              console.error('Error while fetching user names:', error);
            }
          );
        });
      } catch (error) {
        console.error('Database error:', error);
      }
    })();
  }, []);

  const getLastAddedUserName = () => {
    return new Promise<string>((resolve, reject) => {
      (async () => {
        try {
          const dbInstance = await db;
          dbInstance.transaction((tx) => {
            tx.executeSql(
              'SELECT name FROM users ORDER BY name DESC LIMIT 1',
              [],
              (_, results) => {
                if (results.rows.length > 0) {
                  const lastUserName = results.rows.item(0)?.name || '';
                  resolve(lastUserName);
                } else {
                  reject(new Error('No user found.'));
                }
              },
              (_, error) => {
                reject(error);
              }
            );
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  };

  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBackground} style={styles.imageBackground}>
        <TouchableOpacity onPress={goToHome}>
          <View style={styles.headerContainer}>
            <Image source={arrowleft} style={styles.leftIcon} />
            <Text style={styles.headerText}>Rankings</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rankingContainer}>
          <View style={styles.columnContainer}>
            <View style={styles.ImageContainer}>
              <Text style={styles.textName}>Y</Text>
            </View>
            <View style={styles.twoColumn}>
              <Text style={styles.textNumber}>2</Text>
            </View>
          </View>

          <View style={styles.columnContainer}>
            <View style={styles.ImageContainer}>
              <Text style={styles.textName}>{lastUserInitial || 'E'}</Text>
            </View>
            <View style={styles.oneColumn}>
              <Text style={styles.textNumber}>1</Text>
            </View>
          </View>

          <View style={styles.columnContainer}>
            <View style={styles.ImageContainer}>
              <Text style={styles.textName}>K</Text>
            </View>
            <View style={styles.threeColumn}>
              <Text style={styles.textNumber}>3</Text>
            </View>
          </View>

        </View>
        <View style={styles.userRankingsConatiner}>
          {userList.map((user, index) => (
            <View key={index} style={styles.userItem}>
              <Text style={styles.textUser}>{`${index + 3 + 1}. ${user}`}</Text>
              <Text style={styles.textUser}>{score}</Text>
            </View>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    backgroundColor: "#6A5AE0",
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'cover',
  },
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  leftIcon: {
    width: 30,

  },
  headerText: {
    fontFamily: 'Rubik',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 36,
    color: '#fff',
  },
  rankingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  columnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  oneColumn: {
    backgroundColor: '#FF8FA2',
    width: 105,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textNumber: {
    fontFamily: 'Poppins',
    fontSize: 64,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  ImageContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#C4D0FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  textName: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },

  twoColumn: {
    backgroundColor: '#88E2CE',
    width: 105,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  threeColumn: {
    backgroundColor: '#FFE511',
    width: 105,
    height: 105,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userRankingsConatiner: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  userItem: {
    width: 315,
    height: 60,
    backgroundColor: '#C4D0FB',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  textUser: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#fff'
  },
});
