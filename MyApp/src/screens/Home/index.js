import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {getCurrentDate} from '../../utils/dateUtils';
import Svg, {Path} from 'react-native-svg';
import {ProfileCard} from '../../components/index';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Svg
            width="93"
            height="43"
            viewBox="0 0 93 43"
            fill="none"
            style={styles.headerUnionBackground}
            xmlns="http://www.w3.org/2000/svg">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M90.272 40.9183C90.272 41.6716 90.8827 42.2823 91.636 42.2823C92.3893 42.2823 93 41.6716 93 40.9183C93 40.165 92.3893 39.5543 91.636 39.5543C90.8827 39.5543 90.272 40.165 90.272 40.9183ZM90.272 30.6074C90.272 31.3607 90.8827 31.9714 91.636 31.9714C92.3893 31.9714 93 31.3607 93 30.6074C93 29.8541 92.3893 29.2434 91.636 29.2434C90.8827 29.2434 90.272 29.8541 90.272 30.6074ZM90.272 20.2964C90.272 21.0498 90.8827 21.6604 91.636 21.6604C92.3893 21.6604 93 21.0498 93 20.2964C93 19.5431 92.3893 18.9324 91.636 18.9324C90.8827 18.9324 90.272 19.5431 90.272 20.2964ZM90.272 -10.636C90.272 -9.88269 90.8827 -9.27201 91.636 -9.27201C92.3893 -9.27201 93 -9.88269 93 -10.636C93 -11.3893 92.3893 -12 91.636 -12C90.8827 -12 90.272 -11.3893 90.272 -10.636ZM64.1943 -10.636C64.1943 -9.8827 64.805 -9.27201 65.5583 -9.27201C66.3116 -9.27201 66.9223 -9.8827 66.9223 -10.636C66.9223 -11.3893 66.3116 -12 65.5583 -12C64.805 -12 64.1943 -11.3893 64.1943 -10.636ZM12.0389 -10.636C12.0389 -9.8827 12.6495 -9.27201 13.4029 -9.27201C14.1562 -9.27201 14.7668 -9.8827 14.7668 -10.636C14.7668 -11.3893 14.1562 -12 13.4029 -12C12.6495 -12 12.0389 -11.3893 12.0389 -10.636ZM39.4805 -9.27201C38.7272 -9.27201 38.1165 -9.8827 38.1165 -10.636C38.1165 -11.3893 38.7272 -12 39.4805 -12C40.2339 -12 40.8445 -11.3893 40.8445 -10.636C40.8445 -9.8827 40.2339 -9.27201 39.4805 -9.27201ZM0.364006 -9.27201C-0.389313 -9.27201 -0.999992 -9.8827 -0.999992 -10.636C-0.999992 -11.3893 -0.389313 -12 0.364006 -12C1.11732 -12 1.728 -11.3893 1.728 -10.636C1.728 -9.8827 1.11732 -9.27201 0.364006 -9.27201ZM51.1555 -10.636C51.1555 -9.8827 51.7662 -9.27201 52.5195 -9.27201C53.2728 -9.27201 53.8835 -9.8827 53.8835 -10.636C53.8835 -11.3893 53.2728 -12 52.5195 -12C51.7662 -12 51.1555 -11.3893 51.1555 -10.636ZM26.4417 -9.27201C25.6884 -9.27201 25.0777 -9.8827 25.0777 -10.636C25.0777 -11.3893 25.6884 -12 26.4417 -12C27.195 -12 27.8057 -11.3893 27.8057 -10.636C27.8057 -9.8827 27.195 -9.27201 26.4417 -9.27201ZM77.2332 -10.636C77.2332 -9.8827 77.8439 -9.27201 78.5972 -9.27201C79.3505 -9.27201 79.9612 -9.8827 79.9612 -10.636C79.9612 -11.3893 79.3505 -12 78.5972 -12C77.8439 -12 77.2332 -11.3893 77.2332 -10.636ZM13.4029 21.6604C12.6495 21.6604 12.0389 21.0498 12.0389 20.2964C12.0389 19.5431 12.6495 18.9324 13.4029 18.9324C14.1562 18.9324 14.7668 19.5431 14.7668 20.2964C14.7668 21.0498 14.1562 21.6604 13.4029 21.6604ZM64.1943 20.2964C64.1943 21.0498 64.805 21.6604 65.5583 21.6604C66.3116 21.6604 66.9223 21.0498 66.9223 20.2964C66.9223 19.5431 66.3116 18.9324 65.5583 18.9324C64.805 18.9324 64.1943 19.5431 64.1943 20.2964ZM39.4805 21.6604C38.7272 21.6604 38.1165 21.0498 38.1165 20.2964C38.1165 19.5431 38.7272 18.9324 39.4805 18.9324C40.2339 18.9324 40.8445 19.5431 40.8445 20.2964C40.8445 21.0498 40.2339 21.6604 39.4805 21.6604ZM0.364012 21.6604C-0.389307 21.6604 -0.999986 21.0498 -0.999986 20.2964C-0.999986 19.5431 -0.389306 18.9324 0.364012 18.9324C1.11732 18.9324 1.728 19.5431 1.728 20.2964C1.728 21.0498 1.11732 21.6604 0.364012 21.6604ZM51.1555 20.2964C51.1555 21.0498 51.7662 21.6604 52.5195 21.6604C53.2728 21.6604 53.8835 21.0498 53.8835 20.2964C53.8835 19.5431 53.2728 18.9324 52.5195 18.9324C51.7662 18.9324 51.1555 19.5431 51.1555 20.2964ZM26.4417 21.6604C25.6884 21.6604 25.0777 21.0498 25.0777 20.2964C25.0777 19.5431 25.6884 18.9324 26.4417 18.9324C27.195 18.9324 27.8057 19.5431 27.8057 20.2964C27.8057 21.0498 27.195 21.6604 26.4417 21.6604ZM77.2332 20.2964C77.2332 21.0498 77.8439 21.6604 78.5972 21.6604C79.3505 21.6604 79.9612 21.0498 79.9612 20.2964C79.9612 19.5431 79.3505 18.9324 78.5972 18.9324C77.8439 18.9324 77.2332 19.5431 77.2332 20.2964ZM13.4029 1.03892C12.6495 1.03892 12.0389 0.428241 12.0389 -0.325071C12.0389 -1.07838 12.6495 -1.68906 13.4029 -1.68906C14.1562 -1.68906 14.7668 -1.07838 14.7668 -0.325071C14.7668 0.428241 14.1562 1.03892 13.4029 1.03892ZM64.1943 -0.325071C64.1943 0.428241 64.805 1.03892 65.5583 1.03892C66.3116 1.03892 66.9223 0.428242 66.9223 -0.325071C66.9223 -1.07838 66.3116 -1.68906 65.5583 -1.68906C64.805 -1.68906 64.1943 -1.07838 64.1943 -0.325071ZM39.4805 1.03892C38.7272 1.03892 38.1165 0.428241 38.1165 -0.325071C38.1165 -1.07838 38.7272 -1.68906 39.4805 -1.68906C40.2339 -1.68906 40.8445 -1.07838 40.8445 -0.325071C40.8445 0.428241 40.2339 1.03892 39.4805 1.03892ZM90.272 -0.325071C90.272 0.428241 90.8827 1.03892 91.636 1.03892C92.3893 1.03892 93 0.428241 93 -0.325071C93 -1.07838 92.3893 -1.68907 91.636 -1.68907C90.8827 -1.68907 90.272 -1.07838 90.272 -0.325071ZM0.364013 1.03892C-0.389306 1.03892 -0.999985 0.428241 -0.999985 -0.325071C-0.999985 -1.07838 -0.389306 -1.68906 0.364013 -1.68906C1.11732 -1.68906 1.728 -1.07838 1.728 -0.325071C1.728 0.428242 1.11732 1.03892 0.364013 1.03892ZM51.1555 -0.325071C51.1555 0.428241 51.7662 1.03892 52.5195 1.03892C53.2728 1.03892 53.8835 0.428241 53.8835 -0.325071C53.8835 -1.07838 53.2728 -1.68906 52.5195 -1.68906C51.7662 -1.68906 51.1555 -1.07838 51.1555 -0.325071ZM26.4417 1.03892C25.6884 1.03892 25.0777 0.428241 25.0777 -0.325071C25.0777 -1.07838 25.6884 -1.68907 26.4417 -1.68907C27.195 -1.68906 27.8057 -1.07838 27.8057 -0.325071C27.8057 0.428241 27.195 1.03892 26.4417 1.03892ZM77.2332 -0.325071C77.2332 0.428241 77.8439 1.03892 78.5972 1.03892C79.3505 1.03892 79.9612 0.428241 79.9612 -0.325071C79.9612 -1.07838 79.3505 -1.68906 78.5972 -1.68906C77.8439 -1.68906 77.2332 -1.07838 77.2332 -0.325071ZM13.4029 31.9714C12.6495 31.9714 12.0389 31.3607 12.0389 30.6074C12.0389 29.8541 12.6495 29.2434 13.4029 29.2434C14.1562 29.2434 14.7668 29.8541 14.7668 30.6074C14.7668 31.3607 14.1562 31.9714 13.4029 31.9714ZM64.1943 30.6074C64.1943 31.3607 64.805 31.9714 65.5583 31.9714C66.3116 31.9714 66.9223 31.3607 66.9223 30.6074C66.9223 29.8541 66.3116 29.2434 65.5583 29.2434C64.805 29.2434 64.1943 29.8541 64.1943 30.6074ZM39.4805 31.9714C38.7272 31.9714 38.1165 31.3607 38.1165 30.6074C38.1165 29.8541 38.7272 29.2434 39.4805 29.2434C40.2339 29.2434 40.8445 29.8541 40.8445 30.6074C40.8445 31.3607 40.2339 31.9714 39.4805 31.9714ZM0.364012 31.9714C-0.389307 31.9714 -0.999987 31.3607 -0.999987 30.6074C-0.999987 29.8541 -0.389307 29.2434 0.364012 29.2434C1.11732 29.2434 1.728 29.8541 1.728 30.6074C1.728 31.3607 1.11732 31.9714 0.364012 31.9714ZM51.1555 30.6074C51.1555 31.3607 51.7662 31.9714 52.5195 31.9714C53.2728 31.9714 53.8835 31.3607 53.8835 30.6074C53.8835 29.8541 53.2728 29.2434 52.5195 29.2434C51.7662 29.2434 51.1555 29.8541 51.1555 30.6074ZM26.4417 31.9714C25.6884 31.9714 25.0777 31.3607 25.0777 30.6074C25.0777 29.8541 25.6884 29.2434 26.4417 29.2434C27.195 29.2434 27.8057 29.8541 27.8057 30.6074C27.8057 31.3607 27.195 31.9714 26.4417 31.9714ZM77.2332 30.6074C77.2332 31.3607 77.8439 31.9714 78.5972 31.9714C79.3505 31.9714 79.9612 31.3607 79.9612 30.6074C79.9612 29.8541 79.3505 29.2434 78.5972 29.2434C77.8439 29.2434 77.2332 29.8541 77.2332 30.6074ZM13.4029 11.3499C12.6495 11.3499 12.0389 10.7392 12.0389 9.98586C12.0389 9.23255 12.6495 8.62187 13.4029 8.62187C14.1562 8.62187 14.7668 9.23255 14.7668 9.98587C14.7668 10.7392 14.1562 11.3499 13.4029 11.3499ZM64.1943 9.98587C64.1943 10.7392 64.805 11.3499 65.5583 11.3499C66.3116 11.3499 66.9223 10.7392 66.9223 9.98587C66.9223 9.23255 66.3116 8.62187 65.5583 8.62187C64.805 8.62187 64.1943 9.23255 64.1943 9.98587ZM39.4805 11.3499C38.7272 11.3499 38.1165 10.7392 38.1165 9.98586C38.1165 9.23255 38.7272 8.62187 39.4805 8.62187C40.2339 8.62187 40.8445 9.23255 40.8445 9.98586C40.8445 10.7392 40.2339 11.3499 39.4805 11.3499ZM90.272 9.98586C90.272 10.7392 90.8827 11.3499 91.636 11.3499C92.3893 11.3499 93 10.7392 93 9.98586C93 9.23255 92.3893 8.62187 91.636 8.62187C90.8827 8.62187 90.272 9.23255 90.272 9.98586ZM0.364013 11.3499C-0.389306 11.3499 -0.999986 10.7392 -0.999986 9.98586C-0.999986 9.23255 -0.389306 8.62187 0.364013 8.62187C1.11732 8.62187 1.728 9.23255 1.728 9.98586C1.728 10.7392 1.11732 11.3499 0.364013 11.3499ZM51.1555 9.98586C51.1555 10.7392 51.7662 11.3499 52.5195 11.3499C53.2728 11.3499 53.8835 10.7392 53.8835 9.98586C53.8835 9.23255 53.2728 8.62187 52.5195 8.62187C51.7662 8.62187 51.1555 9.23255 51.1555 9.98586ZM26.4417 11.3499C25.6884 11.3499 25.0777 10.7392 25.0777 9.98587C25.0777 9.23255 25.6884 8.62187 26.4417 8.62187C27.195 8.62187 27.8057 9.23255 27.8057 9.98587C27.8057 10.7392 27.195 11.3499 26.4417 11.3499ZM77.2332 9.98586C77.2332 10.7392 77.8439 11.3499 78.5972 11.3499C79.3505 11.3499 79.9612 10.7392 79.9612 9.98586C79.9612 9.23255 79.3505 8.62187 78.5972 8.62187C77.8439 8.62187 77.2332 9.23255 77.2332 9.98586ZM13.4029 42.2823C12.6495 42.2823 12.0389 41.6716 12.0389 40.9183C12.0389 40.165 12.6495 39.5543 13.4029 39.5543C14.1562 39.5543 14.7668 40.165 14.7668 40.9183C14.7668 41.6716 14.1562 42.2823 13.4029 42.2823ZM64.1943 40.9183C64.1943 41.6716 64.805 42.2823 65.5583 42.2823C66.3116 42.2823 66.9223 41.6716 66.9223 40.9183C66.9223 40.165 66.3116 39.5543 65.5583 39.5543C64.805 39.5543 64.1943 40.165 64.1943 40.9183ZM39.4805 42.2823C38.7272 42.2823 38.1165 41.6716 38.1165 40.9183C38.1165 40.165 38.7272 39.5543 39.4805 39.5543C40.2339 39.5543 40.8445 40.165 40.8445 40.9183C40.8445 41.6716 40.2339 42.2823 39.4805 42.2823ZM0.364011 42.2823C-0.389307 42.2823 -0.999987 41.6716 -0.999987 40.9183C-0.999987 40.165 -0.389307 39.5543 0.364011 39.5543C1.11732 39.5543 1.728 40.165 1.728 40.9183C1.728 41.6716 1.11732 42.2823 0.364011 42.2823ZM51.1555 40.9183C51.1555 41.6716 51.7662 42.2823 52.5195 42.2823C53.2728 42.2823 53.8835 41.6716 53.8835 40.9183C53.8835 40.165 53.2728 39.5543 52.5195 39.5543C51.7662 39.5543 51.1555 40.165 51.1555 40.9183ZM26.4417 42.2823C25.6884 42.2823 25.0777 41.6716 25.0777 40.9183C25.0777 40.165 25.6884 39.5543 26.4417 39.5543C27.195 39.5543 27.8057 40.165 27.8057 40.9183C27.8057 41.6716 27.195 42.2823 26.4417 42.2823ZM77.2332 40.9183C77.2332 41.6716 77.8439 42.2823 78.5972 42.2823C79.3505 42.2823 79.9612 41.6716 79.9612 40.9183C79.9612 40.165 79.3505 39.5543 78.5972 39.5543C77.8439 39.5543 77.2332 40.165 77.2332 40.9183Z"
              fill="white"
              fillOpacity="0.1"
            />
          </Svg>

          <Svg
            width="500"
            height="174"
            viewBox="0 0 375 174"
            fill="none"
            preserveAspectRatio="none"
            style={styles.headerWaveBackground}
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M37.1946 150.513C20.7275 159.845 5.78508 146.624 0.372261 138.847C-0.542581 137.347 -0.923765 136.139 -1 135.723L-1 174L375 174L375 -2C362.955 27.094 329.5 136.249 307.073 144.055C276.599 154.662 241.662 129.681 200.494 150.513C159.326 171.344 127.307 159.47 108.324 150.513C89.3406 141.556 57.7786 138.847 37.1946 150.513Z"
              fill="white"
              fillOpacity="0.05"
            />
          </Svg>
          <View style={styles.dateWrapper}>
            <Text style={styles.date}>{getCurrentDate()}</Text>
            <View style={styles.icon}>
              <Svg
                width="25"
                height="25"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M21 9.33325C21 7.47674 20.2625 5.69626 18.9497 4.3835C17.637 3.07075 15.8565 2.33325 14 2.33325C12.1435 2.33325 10.363 3.07075 9.05025 4.3835C7.7375 5.69626 7 7.47674 7 9.33325C7 17.4999 3.5 19.8333 3.5 19.8333H24.5C24.5 19.8333 21 17.4999 21 9.33325Z"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M16.0171 24.5C15.812 24.8536 15.5176 25.1471 15.1634 25.3511C14.8092 25.5551 14.4076 25.6625 13.9988 25.6625C13.59 25.6625 13.1884 25.5551 12.8342 25.3511C12.48 25.1471 12.1856 24.8536 11.9805 24.5"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>Hai, Mohammad!</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#000',
                marginTop: 40,
                marginBottom: 18,
                paddingHorizontal: 16,
              }}>
              Top Talent{' '}
            </Text>
          </View>
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5E50A1',
    borderBottomEndRadius: 20,
    paddingTop: 55,
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  headerWaveBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
  },
  headerUnionBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    color: '#fff',
  },
  icon: {},
  nameWrapper: {
    marginTop: 10,
    paddingBottom: 55,
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
  },
});
