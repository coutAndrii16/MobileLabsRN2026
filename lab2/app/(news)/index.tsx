import { FlatList, RefreshControl, Text, View } from "react-native";
import { useState } from "react";
import { generateNews } from "../../data/mockData";
import NewsItem from "../../components/NewsItem";
import { useRouter } from "expo-router";
import {inspect} from "node:util";
import colors = module

export default function MainScreen() {
  const router = useRouter();

  const [data, setData] = useState(generateNews(10));
  const [refreshing, setRefreshing] = useState(false);

  const loadMore = () => {
    setData(prev => [...prev, ...generateNews(10)]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(generateNews(10));
      setRefreshing(false);
    }, 1000);
  };

  return (
      <FlatList
          contentContainerStyle={{ backgroundColor: colors.background, paddingBottom: 20 }}
          data={data}
          keyExtractor={(item) => item.id}

          renderItem={({ item }) => (
              <NewsItem
                  item={item}
                  onPress={() => router.push({ pathname: "/(news)/details", params: item })}
              />
          )}

          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }

          onEndReached={loadMore}
          onEndReachedThreshold={0.5}

          ListHeaderComponent={<Text>News</Text>}
          ListFooterComponent={<Text>Loading...</Text>}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
      />
  );
}