// app/home/_layout.tsx
// Home stack layout with bottom navigation

import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

export default function HomeLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: Array<{
    name: string;
    label: string;
    icon: FeatherIconName;
    route: string;
    isFAB?: boolean;
  }> = [
    { name: 'home', label: 'Keşfet', icon: 'compass', route: '/home' },
    { name: 'map', label: 'Harita', icon: 'map', route: '/home/map' },
    { name: 'add', label: '', icon: 'plus', route: '/home/add-venue', isFAB: true },
    { name: 'favorites', label: 'Favoriler', icon: 'heart', route: '/home/favorites' },
    { name: 'profile', label: 'Profil', icon: 'user', route: '/home/profile' },
  ];

  const isActive = (route: string) => {
    if (route === '/home') {
      return pathname === '/home';
    }
    return pathname?.startsWith(route);
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Tab bar ekranları otomatik route olur, sadece nested route'lar için Stack.Screen gerekli */}
        <Stack.Screen name="venue/[id]" />
      </Stack>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          if (tab.isFAB) {
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.fab}
                onPress={() => router.push(tab.route)}
                activeOpacity={0.8}
              >
                <Feather name={tab.icon} size={24} color={Colors.white} />
              </TouchableOpacity>
            );
          }

          const active = isActive(tab.route);
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => {
                // Eğer zaten aktif tab'a basıldıysa hiçbir şey yapma
                if (active) return;
                // Tab bar için replace kullan (push değil, üst üste binmesin)
                router.replace(tab.route);
              }}
              activeOpacity={0.7}
            >
              <Feather
                name={tab.icon}
                size={22}
                color={active ? Colors.primary : Colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabLabel,
                  active && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
