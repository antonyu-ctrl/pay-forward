import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'ko';
type I18nKey =
    | 'app.name'
    | 'nav.home'
    | 'nav.myForward'
    | 'nav.inbox'
    | 'nav.search'
    | 'nav.profile'
    | 'nav.newChain'
    | 'nav.userProfile'
    | 'nav.followers'
    | 'nav.following'
    | 'nav.userImpact'
    | 'nav.userSetting'
    | 'profile.posts'
    | 'profile.followers'
    | 'profile.following'
    | 'profile.editProfile'
    | 'profile.message'
    | 'profile.tab.post'
    | 'profile.tab.following'
    | 'profile.tab.media'
    | 'profile.impactSuffix'
    | 'settings.title'
    | 'settings.section.account'
    | 'settings.section.privacy'
    | 'settings.section.notifications'
    | 'settings.section.support'
    | 'settings.section.session'
    | 'settings.editProfile'
    | 'settings.language'
    | 'settings.changePassword'
    | 'settings.payments'
    | 'settings.saved'
    | 'settings.activity'
    | 'settings.privateAccount'
    | 'settings.blockedAccounts'
    | 'settings.hiddenWords'
    | 'settings.closeFriends'
    | 'settings.pushNotifications'
    | 'settings.emailNotifications'
    | 'settings.comments'
    | 'settings.mentions'
    | 'settings.helpCenter'
    | 'settings.termsPolicies'
    | 'settings.about'
    | 'settings.logout'
    | 'settings.everyone'
    | 'settings.peopleYouFollow'
    | 'settings.languageModalTitle'
    | 'settings.language.english'
    | 'settings.language.korean'
    | 'search.title'
    | 'search.placeholder'
    | 'inbox.tab.chain'
    | 'inbox.tab.direct'
    | 'inbox.hoursLeft'
    | 'inbox.joined'
    | 'inbox.completed'
    | 'myForward.title'
    | 'myForward.totalLivesTouched'
    | 'myForward.chainsStarted'
    | 'myForward.totalGenerations'
    | 'myForward.tab.ignited'
    | 'myForward.tab.invited'
    | 'myForward.myChains'
    | 'myForward.viewAll'
    | 'myForward.startNewChain'
    | 'myForward.filterChains'
    | 'myForward.filter.all'
    | 'myForward.filter.active'
    | 'myForward.filter.completed'
    | 'myForward.filter.archived'
    | 'myForward.noChainsFound'
    | 'followers.searchPlaceholder'
    | 'followers.follow'
    | 'followers.following'
    | 'create.newChain'
    | 'create.igniteChain'
    | 'create.notYet'
    | 'create.yesLetsGo'
    | 'create.almostReady'
    | 'create.okAddMore'
    | 'create.chainTitle'
    | 'create.designRules'
    | 'create.inviteStarters'
    | 'create.chooseTheme'
    | 'create.hoursToForward'
    | 'create.timeLimitHours'
    | 'create.passTo'
    | 'create.generations'
    | 'create.peopleWillBeTouched'
    | 'create.searchUser'
    | 'create.byEmail'
    | 'create.searchByNameOrId'
    | 'create.enterEmailAddress'
    | 'create.add'
    | 'create.invited'
    | 'create.addPeopleToStartChain'
    | 'create.category.coffee'
    | 'create.category.meal'
    | 'create.category.book'
    | 'create.category.cheerUp'
    | 'create.category.mentor'
    | 'create.category.gift'
    | 'create.category.thanks'
    | 'myForward.livesTouched'
    | 'myForward.nextGoal'
    | 'myForward.othersJoinedWave'
    | 'common.cancel'
    | 'common.completed'
    | 'common.people'
    | 'chain.history'
    | 'chain.filter'
    | 'chain.responseNeeded'
    | 'chain.payForwardResponse'
    | 'chain.forwardedMessage'
    | 'chain.react'
    | 'chain.completed'
    | 'network.title';

const translations: Record<Language, Record<I18nKey, string>> = {
    en: {
        'app.name': 'PayForward',
        'nav.home': 'Home',
        'nav.myForward': 'My Forward',
        'nav.inbox': 'Message',
        'nav.search': 'Search',
        'nav.profile': 'Profile',
        'nav.newChain': 'New Chain',
        'nav.userProfile': 'User Profile',
        'nav.followers': 'Followers',
        'nav.following': 'Following',
        'nav.userImpact': 'User Impact',
        'nav.userSetting': 'User Setting',
        'profile.posts': 'Posts',
        'profile.followers': 'Followers',
        'profile.following': 'Following',
        'profile.editProfile': 'Edit profile',
        'profile.message': 'Message',
        'profile.tab.post': 'Post',
        'profile.tab.following': 'Following',
        'profile.tab.media': 'Media',
        'profile.impactSuffix': "'s Forward",
        'settings.title': 'User Setting',
        'settings.section.account': 'Account',
        'settings.section.privacy': 'Privacy',
        'settings.section.notifications': 'Notifications',
        'settings.section.support': 'Support',
        'settings.section.session': 'Session',
        'settings.editProfile': 'Edit Profile',
        'settings.language': 'Language',
        'settings.changePassword': 'Change Password',
        'settings.payments': 'Payments',
        'settings.saved': 'Saved',
        'settings.activity': 'Your Activity',
        'settings.privateAccount': 'Private Account',
        'settings.blockedAccounts': 'Blocked Accounts',
        'settings.hiddenWords': 'Hidden Words',
        'settings.closeFriends': 'Close Friends',
        'settings.pushNotifications': 'Push Notifications',
        'settings.emailNotifications': 'Email Notifications',
        'settings.comments': 'Comments',
        'settings.mentions': 'Mentions',
        'settings.helpCenter': 'Help Center',
        'settings.termsPolicies': 'Terms and Policies',
        'settings.about': 'About',
        'settings.logout': 'Log Out',
        'settings.everyone': 'Everyone',
        'settings.peopleYouFollow': 'People You Follow',
        'settings.languageModalTitle': 'Choose language',
        'settings.language.english': 'English',
        'settings.language.korean': 'Korean',
        'search.title': 'Search',
        'search.placeholder': 'Search functionality coming soon',
        'inbox.tab.chain': 'Chain Message',
        'inbox.tab.direct': 'Direct Message',
        'inbox.hoursLeft': 'h left',
        'inbox.joined': 'joined',
        'inbox.completed': 'completed',
        'myForward.title': 'My Forward',
        'myForward.totalLivesTouched': 'TOTAL LIVES TOUCHED',
        'myForward.chainsStarted': 'CHAINS STARTED',
        'myForward.totalGenerations': 'TOTAL GENERATIONS',
        'myForward.tab.ignited': 'Ignited',
        'myForward.tab.invited': 'Invited',
        'myForward.myChains': 'My Chains',
        'myForward.viewAll': 'View All',
        'myForward.startNewChain': 'Start a New Chain',
        'myForward.filterChains': 'Filter Chains',
        'myForward.filter.all': 'All',
        'myForward.filter.active': 'Active',
        'myForward.filter.completed': 'Completed',
        'myForward.filter.archived': 'Archived',
        'myForward.noChainsFound': 'No chains found.',
        'followers.searchPlaceholder': 'Search',
        'followers.follow': 'Follow',
        'followers.following': 'Following',
        'create.newChain': 'New Chain',
        'create.igniteChain': 'Ignite Chain',
        'create.notYet': 'Not Yet',
        'create.yesLetsGo': "Yes, Let's Go",
        'create.almostReady': 'Almost Ready!',
        'create.okAddMore': "Okay, I'll add more",
        'create.chainTitle': 'CHAIN TITLE',
        'create.designRules': 'DESIGN RULES',
        'create.inviteStarters': 'INVITE STARTERS',
        'create.chooseTheme': 'CHOOSE THEME',
        'create.hoursToForward': 'Hours to Forward',
        'create.timeLimitHours': 'Time limit (hours)',
        'create.passTo': 'Pass to',
        'create.generations': 'Generations',
        'create.peopleWillBeTouched': 'People will be touched',
        'create.searchUser': 'SEARCH USER',
        'create.byEmail': 'BY EMAIL',
        'create.searchByNameOrId': 'Search by name or ID...',
        'create.enterEmailAddress': 'Enter email address...',
        'create.add': 'ADD',
        'create.invited': 'INVITED',
        'create.addPeopleToStartChain': 'Add people to start the chain',
        'create.category.coffee': 'Coffee',
        'create.category.meal': 'Meal',
        'create.category.book': 'Book',
        'create.category.cheerUp': 'Cheer Up',
        'create.category.mentor': 'Mentor',
        'create.category.gift': 'Gift',
        'create.category.thanks': 'Thanks',
        'myForward.livesTouched': 'LIVES TOUCHED',
        'myForward.nextGoal': 'NEXT GOAL',
        'myForward.othersJoinedWave': 'and others joined this wave',
        'common.cancel': 'Cancel',
        'common.completed': 'Completed',
        'common.people': 'people',
        'chain.history': 'Forward Detail',
        'chain.filter': 'Filter',
        'chain.responseNeeded': 'RESPONSE NEEDED',
        'chain.payForwardResponse': 'PAY-FORWARD RESPONSE',
        'chain.forwardedMessage': 'Forwarded Message',
        'chain.react': 'React',
        'chain.completed': 'COMPLETED',
        'network.title': 'My Forwarding Network',
    },
    ko: {
        'app.name': '페이포워드',
        'nav.home': '홈',
        'nav.myForward': '내 포워드',
        'nav.inbox': '메세지',
        'nav.search': '검색',
        'nav.profile': '프로필',
        'nav.newChain': '새 체인',
        'nav.userProfile': '사용자 프로필',
        'nav.followers': '팔로워',
        'nav.following': '팔로잉',
        'nav.userImpact': '사용자 임팩트',
        'nav.userSetting': '사용자 설정',
        'profile.posts': '게시물',
        'profile.followers': '팔로워',
        'profile.following': '팔로잉',
        'profile.editProfile': '프로필 수정',
        'profile.message': '메시지',
        'profile.tab.post': '게시물',
        'profile.tab.following': '팔로잉',
        'profile.tab.media': '미디어',
        'profile.impactSuffix': '의 포워드',
        'settings.title': '사용자 설정',
        'settings.section.account': '계정',
        'settings.section.privacy': '개인정보',
        'settings.section.notifications': '알림',
        'settings.section.support': '지원',
        'settings.section.session': '세션',
        'settings.editProfile': '프로필 수정',
        'settings.language': '언어',
        'settings.changePassword': '비밀번호 변경',
        'settings.payments': '결제',
        'settings.saved': '저장됨',
        'settings.activity': '내 활동',
        'settings.privateAccount': '비공개 계정',
        'settings.blockedAccounts': '차단된 계정',
        'settings.hiddenWords': '숨겨진 단어',
        'settings.closeFriends': '친한 친구',
        'settings.pushNotifications': '푸시 알림',
        'settings.emailNotifications': '이메일 알림',
        'settings.comments': '댓글',
        'settings.mentions': '멘션',
        'settings.helpCenter': '고객센터',
        'settings.termsPolicies': '약관 및 정책',
        'settings.about': '정보',
        'settings.logout': '로그아웃',
        'settings.everyone': '모든 사람',
        'settings.peopleYouFollow': '팔로우하는 사람',
        'settings.languageModalTitle': '언어 선택',
        'settings.language.english': '영어',
        'settings.language.korean': '한국어',
        'search.title': '검색',
        'search.placeholder': '검색 기능은 곧 제공됩니다',
        'inbox.tab.chain': '체인 메시지',
        'inbox.tab.direct': '다이렉트 메시지',
        'inbox.hoursLeft': '시간 남음',
        'inbox.joined': '참여',
        'inbox.completed': '완료',
        'myForward.title': '나의 포워드',
        'myForward.totalLivesTouched': '총 영향 받은 사람',
        'myForward.chainsStarted': '시작한 체인',
        'myForward.totalGenerations': '총 세대 수',
        'myForward.tab.ignited': '시작함',
        'myForward.tab.invited': '초대받음',
        'myForward.myChains': '내 체인',
        'myForward.viewAll': '전체 보기',
        'myForward.startNewChain': '새 체인 시작',
        'myForward.filterChains': '체인 필터',
        'myForward.filter.all': '전체',
        'myForward.filter.active': '진행중',
        'myForward.filter.completed': '완료',
        'myForward.filter.archived': '보관됨',
        'myForward.noChainsFound': '체인을 찾을 수 없습니다.',
        'followers.searchPlaceholder': '검색',
        'followers.follow': '팔로우',
        'followers.following': '팔로잉',
        'create.newChain': '새 체인',
        'create.igniteChain': '체인 시작하기',
        'create.notYet': '아직 아니요',
        'create.yesLetsGo': '네, 시작할게요',
        'create.almostReady': '거의 준비됐어요!',
        'create.okAddMore': '네, 더 추가할게요',
        'create.chainTitle': '체인 제목',
        'create.designRules': '설계 규칙',
        'create.inviteStarters': '시작 멤버 초대',
        'create.chooseTheme': '테마 선택',
        'create.hoursToForward': '전달 시간',
        'create.timeLimitHours': '제한 시간(시간)',
        'create.passTo': '전달 인원',
        'create.generations': '세대 수',
        'create.peopleWillBeTouched': '영향 받는 사람',
        'create.searchUser': '사용자 검색',
        'create.byEmail': '이메일로',
        'create.searchByNameOrId': '이름 또는 ID로 검색...',
        'create.enterEmailAddress': '이메일 주소 입력...',
        'create.add': '추가',
        'create.invited': '초대됨',
        'create.addPeopleToStartChain': '체인을 시작할 사람을 추가하세요',
        'create.category.coffee': '커피',
        'create.category.meal': '식사',
        'create.category.book': '책',
        'create.category.cheerUp': '응원',
        'create.category.mentor': '멘토',
        'create.category.gift': '선물',
        'create.category.thanks': '감사',
        'myForward.livesTouched': '영향 받은 사람',
        'myForward.nextGoal': '다음 목표',
        'myForward.othersJoinedWave': '그리고 다른 사람들도 이 물결에 함께했어요',
        'common.cancel': '취소',
        'common.completed': '완료',
        'common.people': '명',
        'chain.history': '포워드 상세',
        'chain.filter': '필터',
        'chain.responseNeeded': '응답 필요',
        'chain.payForwardResponse': '페이포워드 응답',
        'chain.forwardedMessage': '전달된 메시지',
        'chain.react': '리액트',
        'chain.completed': '완료됨',
        'network.title': '나의 포워드 네트워크',
    },
};

const STORAGE_KEY = 'payforward_language';

type I18nContextValue = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: I18nKey) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) return;
        const saved = globalThis.localStorage.getItem(STORAGE_KEY);
        if (saved === 'en' || saved === 'ko') {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
            globalThis.localStorage.setItem(STORAGE_KEY, lang);
        }
    };

    const value = useMemo<I18nContextValue>(
        () => ({
            language,
            setLanguage,
            t: (key: I18nKey) => translations[language][key] ?? key,
        }),
        [language]
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}
