import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, image, price, description }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, price, description, image }));
  };

  const removeItemFromBasket = () => {
    if (items.length < 1) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed((prev) => !prev)}
        className={`bg-white ${isPressed ? "" : "border"} p-4 border-gray-200`}
      >
        <View className={"flex-row"}>
          <View className={"flex-1 pr-2"}>
            <Text className={"text-lg mb-1"}>{name}</Text>
            <Text className={"text-gray-400"}>{description}</Text>
            <Text>
              <Currency quantity={price} currency={"GBP"} />
            </Text>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1 }}
              source={{ uri: urlFor(image).url() }}
              className={"h-20 w-20 bg-gray-300 p-4"}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className={"bg-white px-4"}>
          <View className={"flex-row items-center space-x-2 pb-3"}>
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={"#00CCBB"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;