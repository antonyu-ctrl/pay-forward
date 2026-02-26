import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Platform, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../../lib/i18n';

type SettingRowProps = {
    icon: React.ComponentProps<typeof Feather>['name'];
    label: string;
    value?: string;
    onPress?: () => void;
    isDanger?: boolean;
};

function SettingRow({ icon, label, value, onPress, isDanger }: SettingRowProps) {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-between px-4 py-3.5 border-b border-gray-100"
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View className="flex-row items-center flex-1 mr-3">
                <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${isDanger ? 'bg-rose-50' : 'bg-gray-100'}`}>
                    <Feather name={icon} size={16} color={isDanger ? '#E11D48' : '#374151'} />
                </View>
                <Text className={`text-[15px] ${isDanger ? 'text-rose-600 font-semibold' : 'text-gray-900 font-medium'}`}>
                    {label}
                </Text>
            </View>
            <View className="flex-row items-center">
                {value ? <Text className="text-sm text-gray-500 mr-2">{value}</Text> : null}
                <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </View>
        </TouchableOpacity>
    );
}

type SwitchRowProps = {
    icon: React.ComponentProps<typeof Feather>['name'];
    label: string;
    value: boolean;
    onChange: (next: boolean) => void;
};

function SwitchRow({ icon, label, value, onChange }: SwitchRowProps) {
    return (
        <View className="flex-row items-center justify-between px-4 py-3.5 border-b border-gray-100">
            <View className="flex-row items-center flex-1 mr-3">
                <View className="w-8 h-8 rounded-full items-center justify-center mr-3 bg-gray-100">
                    <Feather name={icon} size={16} color="#374151" />
                </View>
                <Text className="text-[15px] text-gray-900 font-medium">{label}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: '#D1D5DB', true: '#7DD3FC' }}
                thumbColor={value ? '#0EA5E9' : '#F3F4F6'}
            />
        </View>
    );
}

function SectionLabel({ label }: { label: string }) {
    return (
        <Text className="px-4 pt-5 pb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
            {label}
        </Text>
    );
}

export default function SettingsScreen() {
    const router = useRouter();
    const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
    const { language, setLanguage, t } = useI18n();
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [privateAccount, setPrivateAccount] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const handleGoBack = () => router.replace((returnTo || '/(tabs)/profile') as any);

    return (
        <View
            className="flex-1 bg-gray-50 items-center"
            style={Platform.OS === 'web' ? ({ height: '100vh' } as any) : { flex: 1 }}
        >
            <View className="w-full max-w-md flex-1 bg-white shadow-sm overflow-hidden flex flex-col">
                <SafeAreaView className="flex-1 bg-white" edges={['top']}>
                    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
                        <TouchableOpacity onPress={handleGoBack} className="w-8">
                            <Feather name="arrow-left" size={24} color="#111827" />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold text-gray-900">{t('settings.title')}</Text>
                        <View className="w-8" />
                    </View>

                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        <SectionLabel label={t('settings.section.account')} />
                        <SettingRow icon="user" label={t('settings.editProfile')} value="Anton_Yu" />
                        <SettingRow
                            icon="globe"
                            label={t('settings.language')}
                            value={language === 'ko' ? t('settings.language.korean') : t('settings.language.english')}
                            onPress={() => setLanguageModalVisible(true)}
                        />
                        <SettingRow icon="lock" label={t('settings.changePassword')} />
                        <SettingRow icon="credit-card" label={t('settings.payments')} />
                        <SettingRow icon="bookmark" label={t('settings.saved')} />
                        <SettingRow icon="clock" label={t('settings.activity')} />

                        <SectionLabel label={t('settings.section.privacy')} />
                        <SwitchRow icon="shield" label={t('settings.privateAccount')} value={privateAccount} onChange={setPrivateAccount} />
                        <SettingRow icon="users" label={t('settings.blockedAccounts')} />
                        <SettingRow icon="eye-off" label={t('settings.hiddenWords')} />
                        <SettingRow icon="user-check" label={t('settings.closeFriends')} />

                        <SectionLabel label={t('settings.section.notifications')} />
                        <SwitchRow icon="bell" label={t('settings.pushNotifications')} value={pushEnabled} onChange={setPushEnabled} />
                        <SwitchRow icon="mail" label={t('settings.emailNotifications')} value={emailEnabled} onChange={setEmailEnabled} />
                        <SettingRow icon="message-circle" label={t('settings.comments')} value={t('settings.everyone')} />
                        <SettingRow icon="at-sign" label={t('settings.mentions')} value={t('settings.peopleYouFollow')} />

                        <SectionLabel label={t('settings.section.support')} />
                        <SettingRow icon="help-circle" label={t('settings.helpCenter')} />
                        <SettingRow icon="file-text" label={t('settings.termsPolicies')} />
                        <SettingRow icon="info" label={t('settings.about')} value="v1.0.0" />

                        <SectionLabel label={t('settings.section.session')} />
                        <SettingRow icon="log-out" label={t('settings.logout')} isDanger />

                        <View className="h-20" />
                    </ScrollView>
                </SafeAreaView>
            </View>

            <Modal
                visible={languageModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <View className="flex-1 bg-black/30 items-center justify-center px-6">
                    <View className="w-full max-w-sm bg-white rounded-2xl overflow-hidden">
                        <View className="px-5 py-4 border-b border-gray-100">
                            <Text className="text-base font-bold text-gray-900">{t('settings.languageModalTitle')}</Text>
                        </View>

                        <TouchableOpacity
                            className="px-5 py-4 flex-row items-center justify-between border-b border-gray-100"
                            onPress={() => {
                                setLanguage('en');
                                setLanguageModalVisible(false);
                            }}
                        >
                            <Text className="text-[15px] font-medium text-gray-900">{t('settings.language.english')}</Text>
                            {language === 'en' ? <Feather name="check" size={18} color="#0EA5E9" /> : <View className="w-[18px]" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="px-5 py-4 flex-row items-center justify-between border-b border-gray-100"
                            onPress={() => {
                                setLanguage('ko');
                                setLanguageModalVisible(false);
                            }}
                        >
                            <Text className="text-[15px] font-medium text-gray-900">{t('settings.language.korean')}</Text>
                            {language === 'ko' ? <Feather name="check" size={18} color="#0EA5E9" /> : <View className="w-[18px]" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="px-5 py-4 items-center"
                            onPress={() => setLanguageModalVisible(false)}
                        >
                            <Text className="text-[15px] font-semibold text-gray-600">{t('common.cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
