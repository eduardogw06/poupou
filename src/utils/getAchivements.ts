export interface Achievements {
    [key: string]: {
        value: boolean;
        text: string;
    };
}

export interface AchievementConfig {
    value: number;
    text: string;
}

export const getAchievements = (totalAmount: number, configs: AchievementConfig[]): Achievements => {
    const achievements: Achievements = {};

    configs.map((config: AchievementConfig): void => {
        if (totalAmount > config.value) {
            achievements[config.value] = {
                value: totalAmount > config.value,
                text: config.text
            }
        }

    });

    return achievements;
};