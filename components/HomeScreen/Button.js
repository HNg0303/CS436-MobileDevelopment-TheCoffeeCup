import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function Button({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-blue-500 p-2 rounded-md">
            <Text className="text-white">{title}</Text>
        </TouchableOpacity>
    );
}