import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Colors, Typography } from '@/constants/Colors';

export default function TabScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Em Breve</Text>
      <View style={styles.separator} />
      <Text style={styles.desc}>Esta funcionalidade está em desenvolvimento.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.header,
    color: '#fff',
  },
  desc: {
    fontSize: 16,
    fontFamily: Typography.body,
    color: Colors.dark.icon,
    marginTop: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: '#333',
  },
});
