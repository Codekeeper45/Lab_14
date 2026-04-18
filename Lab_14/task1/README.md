# Lab 14.1 — FlatList Contacts

Student Name: Emir
Date: 18.04.2026

## Description
This task implements a performant user directory using React Native `FlatList`.
The screen includes:
- `getItemLayout` for fixed-height item optimization
- `initialNumToRender`, `windowSize`, and `maxToRenderPerBatch`
- `removeClippedSubviews` for Android optimization
- custom item separator and empty state
- pull-to-refresh with `RefreshControl`

## Files
- `src/types.ts`
- `src/utils/mockData.ts`
- `src/screens/ContactsScreen.tsx`

## Notes
The list renders 1,000 mock contacts to match the assignment requirement. Refresh reloads a new dataset.
