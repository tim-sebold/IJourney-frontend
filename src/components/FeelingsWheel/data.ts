import type { EmotionNode } from "../../lib/types";

export const emotions: EmotionNode = {
    "id": "root",
    "name": "root",
    "color": "",
    "level": 0,
    "description": "",
    "children": [
        {
            "id": "surprised",
            "name": "Surprised",
            "emoji": "🤩",
            "level": 1,
            "color": "#f4a261",
            "description": "Feeling unexpected astonishment, disbelief, or wonder in response to something unforeseen or novel. This emotion involves a sudden shift in attention and perception due to a surprising event or revelation.",
            "children": [
                {
                    "id": "startled",
                    "name": "Startled",
                    "color": "#f4a261",
                    "level": 2,
                    "description": "Feeling suddenly surprised, alarmed, or startled by something unexpected or sudden. This emotion involves a quick and instinctive reaction to a surprising event or noise.",
                    "children": [
                        { "id": "shocked", "name": "Shocked", "color": "#f4a261", "level": 3, "description": "Feeling deeply surprised, stunned, or shaken by something unexpected, unsettling, or traumatic. This emotion involves a strong and intense reaction to a sudden or significant event that challenges one's expectations or understanding." },
                        { "id": "dismayed", "name": "Dismayed", "color": "#f4a261", "level": 3, "description": "Feeling distressed, discouraged, or disheartened by something disappointing or unpleasant. This emotion involves a sense of dismay or disappointment in response to negative developments or outcomes." }
                    ]
                },
                {
                    "id": "confused",
                    "name": "Confused",
                    "color": "#f4a261",
                    "level": 2,
                    "description": "Feeling uncertain, puzzled, or mentally unclear about something, often resulting from a lack of understanding or conflicting information. This emotion involves a sense of cognitive disarray and uncertainty.",
                    "children": [
                        { "id": "disiliusioned", "name": "Disiliusioned", "color": "#f4a261", "level": 3, "description": "Feeling disappointed, disenchanted, or disillusioned by a realization that something is not as good or ideal as previously believed. This emotion involves a loss of faith or trust in something previously admired or valued." },
                        { "id": "perplexed", "name": "Perplexed", "color": "#f4a261", "level": 3, "description": "Feeling puzzled, bewildered, or uncertain about a situation or problem that is difficult to understand or explain. This emotion involves a deeper sense of confusion and difficulty in finding a clear solution or explanation." }
                    ]
                },
                {
                    "id": "amazed",
                    "name": "Amazed",
                    "color": "#f4a261",
                    "level": 2,
                    "description": "Feeling astonishment, wonder, or awe at something surprising, extraordinary, or impressive. This emotion involves a sense of marvel and admiration in response to something remarkable.",
                    "children": [
                        { "id": "astonished", "name": "Astonished", "color": "#f4a261", "level": 3, "description": "Feeling greatly surprised or shocked by something unexpected or extraordinary. This emotion involves a sudden and profound shift in perception or understanding due to a surprising event or revelation." },
                        { "id": "awe", "name": "Awe", "color": "#f4a261", "level": 3, "description": "Feeling reverential respect mixed with fear or wonder in response to something majestic, sublime, or powerful. This emotion involves a deep sense of admiration and humility in the presence of something awe-inspiring." }
                    ]
                },
                {
                    "id": "excited",
                    "name": "Excited",
                    "color": "#f4a261",
                    "level": 2,
                    "description": "Feeling enthusiastic, eager, and thrilled about something anticipated or expected to happen. This emotion involves a heightened state of positive anticipation.",
                    "children": [
                        { "id": "eager", "name": "Eager", "color": "#f4a261", "level": 3, "description": "Feeling keenly interested, enthusiastic, and impatiently longing for something to happen or be achieved. This emotion involves a strong desire or readiness to act or participate." },
                        { "id": "energetic", "name": "Energetic", "color": "#f4a261", "level": 3, "description": "Feeling lively, vigorous, and full of physical or mental energy. This emotion involves a sense of vitality, readiness for action, and a high level of alertness." }
                    ]
                }
            ]
        },
        {
            "id": "happy",
            "name": "Happy",
            "emoji": "😀",
            "level": 1,
            "color": "#e76f51",
            "description": "Feeling joyous, content, or delighted, often as a result of positive experiences, relationships, or circumstances. This emotion involves a sense of well-being and satisfaction.",
            "children": [
                {
                    "id": "playful",
                    "name": "Playful",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling lighthearted, mischievous, and inclined to engage in fun or amusing activities. This emotion involves a sense of spontaneity, creativity, and enjoyment in playful interactions.",
                    "children": [
                        { "id": "aroused", "name": "Aroused", "color": "#F26D4A", "level": 3, "description": "This emotion refers to a state of heightened physiological activity. It encompasses increased alertness, energy, and sensory sensitivity. Arousal can be triggered by various stimuli, including excitement, fear, or anticipation. It is often associated with an increased heart rate, rapid breathing, and a surge of adrenaline. Arousal can be positive (such as excitement or enthusiasm) or negative (such as anxiety or stress)." },
                        { "id": "cheeky", "name": "Cheeky", "color": "#F26D4A", "level": 3, "description": "Feeling impudent, bold, or teasing in a playful or provocative manner. This emotion involves a sense of light-hearted irreverence or audacity, often with a touch of charm." }
                    ]
                },
                {
                    "id": "content",
                    "name": "Content",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling satisfied, at ease, and peaceful with one's current situation, circumstances, or state of being. This emotion involves a sense of happiness and fulfillment without needing more or different conditions.",
                    "children": [
                        { "id": "free", "name": "Free", "color": "#F26D4A", "level": 3, "description": "Feeling liberated, unrestrained, and unburdened, often from limitations, responsibilities, or inhibitions. This emotion involves a sense of independence and openness to experience." },
                        { "id": "joyful", "name": "Joyful", "color": "#F26D4A", "level": 3, "description": "Feeling intense happiness, delight, or exuberance, often accompanied by smiles, laughter, or a sense of inner warmth. This emotion involves a deep sense of pleasure and positive emotional well-being." }
                    ]
                },
                {
                    "id": "interested",
                    "name": "Interested",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling curious, engaged, and attentive toward something or someone. This emotion involves a desire to learn, explore, or understand more about a particular subject or situation.",
                    "children": [
                        { "id": "curious", "name": "Curious", "color": "#F26D4A", "level": 3, "description": "Feeling a strong desire to know or learn about something, driven by an innate sense of wonder and interest. This emotion involves a playful and exploratory mindset." },
                        { "id": "inquisitive", "name": "Inquisitive", "color": "#F26D4A", "level": 3, "description": "Feeling eager to learn or acquire knowledge, often by asking questions and seeking information. This emotion involves a natural curiosity and a drive to investigate and explore new ideas or concepts." }
                    ]
                },
                {
                    "id": "proud",
                    "name": "Proud",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling a sense of satisfaction, fulfillment, and accomplishment in one's achievements, actions, or qualities. This emotion involves a positive self-assessment and recognition of personal strengths or successes.",
                    "children": [
                        { "id": "successful", "name": "Successful", "color": "#F26D4A", "level": 3, "description": "Feeling accomplished, achieving desired outcomes or goals, and experiencing fulfillment and recognition for one's efforts. This emotion involves a sense of pride and satisfaction in accomplishments." },
                        { "id": "confident", "name": "Confident", "color": "#F26D4A", "level": 3, "description": "Feeling self-assured, assertive, and secure in one's abilities, decisions, and appearance. This emotion involves a belief in oneself and the capability to handle challenges and pursue goals effectively." }
                    ]
                },
                {
                    "id": "accepted",
                    "name": "Accepted",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling welcomed, included, and embraced by others without judgment or rejection. This emotion involves a sense of belonging and validation of one's worthiness.",
                    "children": [
                        { "id": "respected", "name": "Respected", "color": "#F26D4A", "level": 3, "description": "Feeling admired, honored, and treated with consideration and esteem by others. This emotion involves acknowledgment of one's dignity, opinions, and boundaries." },
                        { "id": "valued", "name": "Valued", "color": "#F26D4A", "level": 3, "description": "Feeling appreciated, esteemed, and recognized for one's contributions, qualities, or efforts. This emotion involves a sense of importance and respect from others." }
                    ]
                },
                {
                    "id": "powerful",
                    "name": "Powerful",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling strong, capable, and influential in one's actions or impact on others. This emotion involves confidence, assertiveness, and a sense of control or mastery in achieving goals or affecting change.",
                    "children": [
                        { "id": "courageous", "name": "Courageous", "color": "#F26D4A", "level": 3, "description": "Feeling brave, confident, and willing to face fear, danger, or uncertainty. This emotion involves taking bold actions despite potential risks or challenges." },
                        { "id": "creative", "name": "Creative", "color": "#F26D4A", "level": 3, "description": "Feeling inspired to generate ideas, explore possibilities, and express oneself uniquely through imagination or artistic endeavors. This emotion involves a sense of innovation and originality." }
                    ]
                },
                {
                    "id": "peaceful",
                    "name": "Peaceful",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling calm, serene, and free from stress or conflict. This emotion involves a sense of inner tranquility and harmony.",
                    "children": [
                        { "id": "loving", "name": "Loving", "color": "#F26D4A", "level": 3, "description": "Feeling affectionate, caring, and deeply attached to someone or something. This emotion involves warmth, compassion, and a desire for the well-being and happiness of others." },
                        { "id": "thankful", "name": "Thankful", "color": "#F26D4A", "level": 3, "description": "Feeling grateful, appreciative, or indebted to someone or something for a positive outcome or act of kindness. This emotion involves recognizing and valuing the contributions or benefits received." }
                    ]
                },
                {
                    "id": "trusting",
                    "name": "Trusting",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Trusting is the emotional state of having confidence or faith in someone or something. When a person feels trusting, they believe that the object of their trust is reliable, truthful, and will act in their best interest. This emotion often arises in relationships where there is a history of positive experiences and consistent behavior, leading to an expectation of future dependability and integrity.",
                    "children": [
                        { "id": "sensitive", "name": "Sensitive", "color": "#F26D4A", "level": 3, "description": "Feeling easily affected or responsive to emotions, stimuli, or changes in the environment. This emotion involves heightened awareness and empathy toward oneself and others." },
                        { "id": "intimate", "name": "Intimate", "color": "#F26D4A", "level": 3, "description": "Feeling deeply connected, close, and emotionally bonded with another person. This emotion involves a sense of trust, openness, and vulnerability in a close relationship." }
                    ]
                },
                {
                    "id": "optimistic",
                    "name": "Optimistic",
                    "color": "#F26D4A",
                    "level": 2,
                    "description": "Feeling hopeful and confident about the future, despite current challenges or uncertainties. This emotion involves a positive outlook and belief that things will improve or turn out well.",
                    "children": [
                        { "id": "hopeful", "name": "Hopeful", "color": "#F26D4A", "level": 3, "description": "Feeling optimistic and confident that something desired or positive will happen in the future. This emotion involves a belief in the possibility of positive outcomes and a sense of anticipation." },
                        { "id": "inspired", "name": "Inspired", "color": "#F26D4A", "level": 3, "description": "Feeling motivated, enthusiastic, or uplifted by someone or something that sparks creativity, passion, or admiration. This emotion involves a sense of being energized and encouraged to pursue goals or aspirations." }
                    ]
                }
            ]
        },
        {
            "id": "sad",
            "name": "Sad",
            "emoji": "😭",
            "level": 1,
            "color": "#ec8c74",
            "description": "Feeling sorrowful, unhappy, or downcast, often due to loss, disappointment, or other negative experiences. This emotion involves a sense of melancholy and may be accompanied by crying, withdrawal, and a lack of energy or interest in activities.",
            "children": [
                {
                    "id": "lonely",
                    "name": "Lonely",
                    "color": "#E07A63",
                    "level": 2,
                    "description": "Feeling a deep sense of isolation or solitude, often accompanied by sadness or longing for companionship. This emotion involves a lack of connection or meaningful relationships with others.",
                    "children": [
                        { "id": "isolated", "name": "Isolated", "color": "#E07A63", "level": 3, "description": "Feeling separated or detached from others, often by choice or circumstance. This emotion involves a sense of being alone and disconnected from social or emotional support networks." },
                        { "id": "abandoned", "name": "Abandoned", "color": "#E07A63", "level": 3, "description": "Feeling deserted, neglected, or left behind by someone or something that was once close or supportive. This emotion involves a sense of betrayal or loss of connection, often leading to feelings of loneliness and sadness." }
                    ]
                },
                {
                    "id": "vulnerable",
                    "name": "Vulnerable",
                    "color": "#E07A63",
                    "level": 2,
                    "description": "Feeling exposed to the risk of emotional or physical harm, often due to a lack of protection or defense. This emotion involves a sense of susceptibility and fragility.",
                    "children": [
                        { "id": "fragile", "name": "Fragile", "color": "#E07A63", "level": 3, "description": "Feeling delicate, easily broken, or emotionally sensitive. This emotion involves a sense of vulnerability and a need for careful handling or protection." },
                        { "id": "victimized", "name": "Victimized", "color": "#E07A63", "level": 5, "description": "Feeling unfairly treated or harmed by others, often leading to a sense of being targeted or taken advantage of. This emotion involves a perception of being a victim of mistreatment, abuse, or injustice." }
                    ]
                },
                {
                    "id": "despair",
                    "name": "Despair",
                    "color": "#E07A63",
                    "level": 2,
                    "description": "Feeling utter hopelessness, sadness, and a lack of belief in the possibility of improvement or change. This emotion involves a profound sense of loss and resignation, often in response to overwhelming difficulties or losses.",
                    "children": [
                        { "id": "grief", "name": "Grief", "color": "#E07A63", "level": 5, "description": "Feeling deep sorrow, sadness, and anguish, typically in response to the loss of someone or something significant. This emotion involves mourning and emotional suffering, often accompanied by longing for what has been lost." },
                        { "id": "powerless", "name": "Powerless", "color": "#E07A63", "level": 4, "description": "Feeling lacking in control, influence, or ability to effect change in a situation. This emotion often arises when one perceives themselves as unable to assert their will or make a meaningful impact." }
                    ]
                },
                {
                    "id": "guilty",
                    "name": "Guilty",
                    "color": "#E07A63",
                    "level": 2,
                    "description": "Feeling responsible for a wrongdoing or offense, resulting in remorse or self-reproach. This emotion involves a sense of moral or legal culpability and can lead to feelings of shame and regret.",
                    "children": [
                        { "id": "ashamed", "name": "Ashamed", "color": "#E07A63", "level": 3, "description": "Feeling embarrassed, humiliated, or distressed about one's actions, behavior, or circumstances. This emotion involves a sense of disgrace or unworthiness and a desire to hide or withdraw from others." },
                        { "id": "remorseful", "name": "Remorseful", "color": "#E07A63", "level": 3, "description": "Feeling deep regret or sorrow for one's actions or behavior, often accompanied by a desire to make amends or seek forgiveness. This emotion involves a strong sense of guilt and a wish to undo or repair the harm caused." }
                    ]
                },
                {
                    "id": "depressed",
                    "name": "Depressed",
                    "color": "#E07A63",
                    "level": 2,
                    "description": "Feeling persistently sad, hopeless, and unmotivated, often with a lack of interest in activities that were once enjoyable. This emotion involves a deep sense of despair and can affect one’s physical and mental well-being, often requiring professional intervention.",
                    "children": [
                        { "id": "empty", "name": "Empty", "color": "#E07A63", "level": 3, "description": "Feeling a profound sense of inner void or hollowness, often accompanied by a lack of emotional or spiritual fulfillment. This emotion involves a feeling of emptiness or numbness, as if something important is missing." },
                        { "id": "inferior", "name": "Inferior", "color": "#E07A63", "level": 3, "description": "Feeling less valuable, capable, or worthy compared to others. This emotion is often accompanied by low self-esteem and a sense of inadequacy, leading to feelings of being subordinate or lesser in some way." }
                    ]
                },
                {
                    "id": "hurt",
                    "name": "Hurt",
                    "color": "#E07A63",
                    "level": 2,
                    "description": "Feeling emotional pain or distress, often as a result of being mistreated, betrayed, or rejected. This emotion involves a sense of being wounded or damaged by the actions or words of others.",
                    "children": [
                        { "id": "embarrassed", "name": "Embarrassed", "color": "#E07A63", "level": 3, "description": "Feeling self-conscious, ashamed, or uncomfortable, often due to a social mistake, awkward situation, or unwanted attention. This emotion involves a sense of exposure and a desire to hide or escape the situation." },
                        { "id": "disappointed", "name": "Disappointed", "color": "#E07A63", "level": 3, "description": "Feeling let down or discouraged because something did not meet expectations or hopes. This emotion arises when there is a gap between what was desired or anticipated and what actually happened, leading to feelings of sadness and frustration." }
                    ]
                }
            ]
        },
        {
            "id": "angry",
            "name": "Angry",
            "emoji": "😠",
            "level": 1,
            "color": "#9c75b7",
            "description": "Feeling strong displeasure or hostility often in response to a perceived wrong, injustice, or frustration. This emotion can range from mild irritation to intense rage and often involves a desire to confront or address the source of the anger.",
            "children": [
                {
                    "id": "let_down",
                    "name": "Let Down",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling disappointed or disheartened because expectations or hopes have not been met. This emotion often arises when someone you rely on or trust fails to deliver on a promise or expectation.",
                    "children": [
                        { "id": "betrayed", "name": "Betrayed", "color": "#8E63B5", "level": 3, "description": "Feeling deeply hurt and violated by someone who has broken your trust or loyalty. This emotion often involves a sense of deception and treachery, leading to feelings of anger, disappointment, and sadness." },
                        { "id": "resentful", "name": "Resentful", "color": "#8E63B5", "level": 3, "description": "Feeling bitterness or indignation due to a perceived unfairness, insult, or injury. This emotion often involves holding onto negative feelings about someone or something that has wronged or slighted you." }
                    ]
                },
                {
                    "id": "humiliated",
                    "name": "Humiliated",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling deeply embarrassed, ashamed, or mortified, often due to being publicly demeaned or ridiculed. This emotion can lead to a loss of dignity and self-respect.",
                    "children": [
                        { "id": "disrespected", "name": "Disrespected", "color": "#8E63B5", "level": 3, "description": "Feeling undervalued, dishonored, or treated with a lack of respect. This emotion arises when one perceives that their worth, opinions, or feelings are being disregarded or belittled." },
                        { "id": "ridiculed", "name": "Ridiculed", "color": "#8E63B5", "level": 3, "description": "Feeling mocked, laughed at, or made fun of in a hurtful way. This emotion often involves a sense of being demeaned or diminished in the eyes of others, leading to feelings of embarrassment and shame." }
                    ]
                },
                {
                    "id": "bitter",
                    "name": "Bitter",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling intense resentment and cynicism as a result of past wrongs or disappointments. This emotion is often characterized by lingering anger and a sense of unfairness or injustice.",
                    "children": [
                        { "id": "indignant", "name": "Indignant", "color": "#8E63B5", "level": 4, "description": "Feeling strong displeasure and anger at something perceived as unjust, offensive, or insulting. This emotion arises from a sense of righteous anger and moral outrage." },
                        { "id": "violated", "name": "Violated", "color": "#8E63B5", "level": 4, "description": "Feeling deeply hurt, breached, or abused, often due to a significant invasion of personal boundaries, rights, or trust. This emotion can lead to feelings of anger, betrayal, and a sense of being unsafe." }
                    ]
                },
                {
                    "id": "mad",
                    "name": "Mad",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling angry or furious, often in response to a specific provocation or frustration. This emotion can vary in intensity from mild irritation to intense rage.",
                    "children": [
                        { "id": "furious", "name": "Furious", "color": "#8E63B5", "level": 4, "description": "Feeling extremely angry, with intense feelings of rage and wrath. This emotion involves a heightened state of anger that can be difficult to control and may lead to aggressive behavior." },
                        { "id": "jealous", "name": "Jealous", "color": "#8E63B5", "level": 3, "description": "Feeling envious and protective, often due to a fear of losing someone's attention, affection, or favor to someone else. This emotion can lead to feelings of insecurity, resentment, and competitiveness." }
                    ]
                },
                {
                    "id": "aggressive",
                    "name": "Aggressive",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling ready to confront or attack, often with a strong sense of hostility or assertiveness. This emotion involves a forceful and sometimes hostile behavior intended to dominate or defend.",
                    "children": [
                        { "id": "provoked", "name": "Provoked", "color": "#8E63B5", "level": 3, "description": "Feeling anger or irritation as a direct result of someone else's actions or words. This emotion arises when one feels deliberately stirred or incited to react negatively." },
                        { "id": "hostile", "name": "Hostile", "color": "#8E63B5", "level": 4, "description": "Feeling intense animosity, aggression, or opposition toward someone or something. This emotion involves a strong desire to confront or harm and can be expressed through aggressive behavior or antagonistic attitudes." }
                    ]
                },
                {
                    "id": "frustrated",
                    "name": "Frustrated",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling annoyed, upset, or discouraged because of an inability to achieve something or because of repeated obstacles. This emotion arises when one's efforts are thwarted or progress is impeded.",
                    "children": [
                        { "id": "infuriated", "name": "Infuriated", "color": "#8E63B5", "level": 4, "description": "Feeling extremely angry and enraged, often with an intense desire to lash out or express one's anger. This emotion is a heightened state of fury and is more intense than typical anger." },
                        { "id": "annoyed", "name": "Annoyed", "color": "#8E63B5", "level": 3, "description": "Feeling mildly irritated or bothered by someone or something. This emotion is less intense than anger and often arises from minor inconveniences or disturbances." }
                    ]
                },
                {
                    "id": "distant",
                    "name": "Distant",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling emotionally detached, unresponsive, or removed from others. This emotion can arise from a desire to avoid intimacy or connection, often due to feeling overwhelmed, hurt, or uninterested.",
                    "children": [
                        { "id": "withdrawn", "name": "Withdrawn", "color": "#8E63B5", "level": 3, "description": "Feeling a strong desire to pull away from social interactions and isolate oneself. This emotion can be a response to feeling overwhelmed, anxious, depressed, or rejected." },
                        { "id": "numb", "name": "Numb", "color": "#8E63B5", "level": 5, "description": "Feeling emotionally detached and unable to experience usual emotions, often as a result of trauma, depression, or prolonged stress. This emotion is characterized by a lack of feeling and emotional responsiveness." }
                    ]
                },
                {
                    "id": "critical",
                    "name": "Critical",
                    "color": "#8E63B5",
                    "level": 2,
                    "description": "Feeling inclined to find fault or judge harshly, often pointing out flaws or mistakes. This emotion involves a negative and evaluative attitude toward others or oneself.",
                    "children": [
                        { "id": "sceptical", "name": "Sceptical", "color": "#8E63B5", "level": 3, "description": "Feeling doubtful or questioning, often due to a lack of trust or belief in the reliability or truth of something. This emotion involves a cautious and questioning attitude." },
                        { "id": "dismissive", "name": "Dismissive", "color": "#8E63B5", "level": 3, "description": "Feeling inclined to reject or disregard someone or something as unworthy of consideration or respect. This emotion involves a sense of superiority and a tendency to belittle or ignore others' opinions or feelings." }
                    ]
                }
            ]
        },

        {
            "id": "fearful",
            "name": "Fearful",
            "emoji": "😨",
            "level": 1,
            "color": "#39a7c1",
            "description": "Feeling afraid or worried about something that is perceived as dangerous, threatening, or likely to cause pain. This emotion often involves a heightened state of alertness and a desire to avoid or escape the source of fear.",
            "children": [
                {
                    "id": "scared",
                    "name": "Scared",
                    "color": "#3FA9C6",
                    "level": 2,
                    "description": "Feeling afraid or worried about something that is perceived as dangerous, threatening, or likely to cause pain. This emotion often involves a heightened state of alertness and a desire to avoid or escape the source of fear.",
                    "children": [
                        { "id": "helpless", "name": "Helpless", "color": "#3FA9C6", "level": 3, "description": "Feeling afraid or worried about something that is perceived as dangerous, threatening, or likely to cause pain. This emotion often involves a heightened state of alertness and a desire to avoid or escape the source of fear." },
                        { "id": "frightened", "name": "Frightened", "color": "#3FA9C6", "level": 3, "description": "Experiencing intense fear, usually in response to an immediate and specific threat or danger. This emotion can lead to a heightened state of alertness and a desire to flee or protect oneself." }
                    ]
                },
                {
                    "id": "anxious",
                    "name": "Anxious",
                    "color": "#3FA9C6",
                    "level": 2,
                    "description": "Experiencing unease, nervousness, or worry about an uncertain or potentially negative event in the future. Anxiety can be persistent and often lacks a specific or immediate cause, leading to feelings of apprehension and tension.",
                    "children": [
                        { "id": "overwhelmed", "name": "Overwhelmed", "color": "#3FA9C6", "level": 3, "description": "Feeling unable to cope with or manage the demands placed upon oneself, resulting in a sense of being overloaded and stressed. This emotion often occurs when there are too many tasks, responsibilities, or emotional pressures to handle effectively." },
                        { "id": "worried", "name": "Worried", "color": "#3FA9C6", "level": 3, "description": "Feeling uneasy or concerned about potential problems or negative outcomes in the future. Worry is a persistent and often nagging emotion that focuses on uncertainties and possible dangers." }
                    ]
                },
                {
                    "id": "Insecure",
                    "name": "Insecure",
                    "color": "#3FA9C6",
                    "level": 2,
                    "description": "Feeling uncertain, lacking confidence, or self-assurance, often due to perceived inadequacies or fear of failure and rejection. This emotion can lead to self-doubt and a constant need for reassurance from others.",
                    "children": [
                        { "id": "inadequate", "name": "Inadequate", "color": "#3FA9C6", "level": 3, "description": "Feeling insufficient, lacking, or not good enough, often in comparison to others or to certain standards. This emotion can lead to feelings of self-doubt and inferiority." },
                        { "id": "inferior", "name": "Inferior", "color": "#3FA9C6", "level": 3, "description": "Feeling less valuable, capable, or worthy compared to others. This emotion is often accompanied by a sense of low self-esteem and can result in feeling subordinate or lesser in some way." }
                    ]
                },
                {
                    "id": "weak",
                    "name": "Weak",
                    "color": "#3FA9C6",
                    "level": 2,
                    "description": "Feeling physically or emotionally powerless, lacking strength, resilience, or the ability to cope with challenges. This emotion can be associated with vulnerability and helplessness.",
                    "children": [
                        { "id": "worthless", "name": "Worthless", "color": "#3FA9C6", "level": 5, "description": "Feeling a complete lack of value, importance, or worth. This emotion is often associated with deep feelings of inadequacy and self-loathing, leading to a belief that one has nothing to offer or contribute." },
                        { "id": "insignificant", "name": "Insignificant", "color": "#3FA9C6", "level": 3, "description": "Feeling unimportant, trivial, or not worthy of attention. This emotion often arises when one believes that their actions, presence, or contributions do not matter or make a difference." }
                    ]
                },
                {
                    "id": "rejected",
                    "name": "Rejected",
                    "color": "#3FA9C6",
                    "level": 2,
                    "description": "Feeling unwanted, excluded, or dismissed by others. This emotion arises when an individual perceives that they are not valued or accepted, leading to feelings of hurt and sadness.",
                    "children": [
                        { "id": "excluded", "name": "Excluded", "color": "#3FA9C6", "level": 3, "description": "Feeling left out or deliberately not included in activities, groups, or conversations. This emotion can result in feelings of loneliness, isolation, and a sense of not belonging." },
                        { "id": "persecuted", "name": "Persecuted", "color": "#3FA9C6", "level": 4, "description": "Feeling harassed, oppressed, or unfairly treated, often due to one's beliefs, identity, or characteristics. This emotion involves a sense of being targeted and victimized by others." }
                    ]
                },
                {
                    "id": "threatened",
                    "name": "Threatened",
                    "color": "#3FA9C6",
                    "level": 2,
                    "description": "Feeling endangered or at risk, often in response to a perceived or real danger, harm, or loss. This emotion involves a sense of being under attack or at risk of something negative happening, triggering a defensive response.",
                    "children": [
                        { "id": "nervous", "name": "Nervous", "color": "#3FA9C6", "level": 3, "description": "Feeling uneasy, apprehensive, or anxious about a situation, often due to uncertainty or fear of potential negative outcomes. This emotion is characterized by a heightened state of alertness, tension, and sometimes physical symptoms such as sweating, trembling, or an increased heart rate. It often occurs in anticipation of a challenging or stressful event." },
                        { "id": "exposed", "name": "Exposed", "color": "#3FA9C6", "level": 3, "description": "Feeling vulnerable or unprotected, often due to having one's weaknesses, secrets, or true self revealed. This emotion can lead to feelings of discomfort, embarrassment, and insecurity, as it involves being open to scrutiny, judgment, or potential harm from others." }
                    ]
                }
            ]
        },

        {
            "id": "disgusted",
            "name": "Disgusted",
            'emoji': "🤮",
            "level": 1,
            "color": "#ab7274",
            "description": "Feeling strong aversion or repulsion toward something or someone, often due to a sense of offense, distaste, or moral outrage. This emotion can be triggered by physical, moral, or social stimuli that are perceived as gross or offensive.",
            "children": [
                {
                    "id": "disapproving",
                    "name": "Disapproving",
                    "color": "#9A6B5B",
                    "level": 2,
                    "description": "Feeling or showing an unfavorable opinion or judgment about something or someone. This emotion involves a negative evaluation and often includes criticism or rejection of the behavior or actions of others.",
                    "children": [
                        { "id": "judgmental", "name": "Judgmental", "color": "#9A6B5B", "level": 3, "description": "Feeling or expressing strong disapproval and critical evaluation of others. This emotion involves a tendency to make harsh judgments and form negative opinions about others' actions, behaviors, or characteristics." },
                        { "id": "condemned", "name": "Condemned", "color": "#9A6B5B", "level": 3, "description": "Feeling harshly judged, criticized, or sentenced as wrong or guilty. This emotion can involve a sense of being severely disapproved of or punished by others." }
                    ]
                },
                {
                    "id": "uncomfortable",
                    "name": "Uncomfortable",
                    "color": "#9A6B5B",
                    "level": 2,
                    "description": "Feeling uneasy, awkward, or distressed in a particular situation. This emotion arises when one is in a situation that feels unpleasant, unfamiliar, or anxiety-inducing.",
                    "children": [
                        { "id": "appalled", "name": "Appalled", "color": "#9A6B5B", "level": 3, "description": "Feeling shocked, horrified, or dismayed by something extremely unpleasant, wrong, or outrageous. This emotion involves a strong reaction of disgust and disbelief." },
                        { "id": "revolted", "name": "Revolted", "color": "#9A6B5B", "level": 3, "description": "Feeling intense disgust and repulsion, often accompanied by a desire to turn away or distance oneself from the source. This emotion is a strong reaction to something perceived as deeply offensive or gross." }
                    ]
                },
                {
                    "id": "awful",
                    "name": "Awful",
                    "color": "#9A6B5B",
                    "level": 2,
                    "description": "Feeling extremely bad, unpleasant, or distressing. This emotion can encompass a range of negative feelings, including sadness, disgust, and discomfort, often in response to a very unpleasant experience or situation.",
                    "children": [
                        { "id": "nauseated", "name": "Nauseated", "color": "#9A6B5B", "level": 3, "description": "Feeling a strong sense of physical discomfort and revulsion, often leading to a sensation of wanting to vomit. This emotion can be triggered by something unpleasant or disgusting and can be both a physical and emotional reaction." },
                        { "id": "detestable", "name": "Detestable", "color": "#9A6B5B", "level": 3, "description": "Feeling intense dislike or hatred toward something or someone that is perceived as extremely unpleasant, offensive, or morally reprehensible. This emotion involves a strong aversion and condemnation." }
                    ]
                },
                {
                    "id": "repelled",
                    "name": "Repelled",
                    "color": "#9A6B5B",
                    "level": 2,
                    "description": "Feeling a strong desire to avoid or distance oneself from something or someone that is perceived as offensive, disgusting, or undesirable. This emotion involves a reaction of pushing away and strong disapproval.",
                    "children": [
                        { "id": "horrified", "name": "Horrified", "color": "#9A6B5B", "level": 4, "description": "Feeling extreme shock, fear, or disgust, often in response to something terrifying, gruesome, or morally repugnant. This emotion involves a strong sense of dread and revulsion." },
                        { "id": "hesitant", "name": "Hesitant", "color": "#9A6B5B", "level": 4, "description": "Feeling unsure, reluctant, or unwilling to take action or make a decision. This emotion involves a lack of confidence or certainty and can result in delay or indecision due to fear, doubt, or uncertainty." }
                    ]
                }
            ]
        },
        {
            "id": "bad",
            "name": "Bad",
            "emoji": "😖",
            "level": 1,
            "color": "#68c4af",
            "description": "Feeling negative emotions such as sadness, anger, or dissatisfaction. This emotion can also indicate that something is not satisfactory or enjoyable.",
            "children": [
                {
                    "id": "bored",
                    "name": "Bored",
                    "color": "#4FB7A5",
                    "level": 2,
                    "description": "Feeling uninterested, disengaged, or lacking stimulation from one's current activities or surroundings. This emotion involves a sense of monotony or lack of excitement.",
                    "children": [
                        { "id": "indifferent", "name": "Indifferent", "color": "#4FB7A5", "level": 3, "description": "Feeling unconcerned, neutral, or unaffected by something, often resulting in a lack of strong emotion or opinion. This emotion involves a state of detachment or disinterest." },
                        { "id": "apathetic", "name": "Apathetic", "color": "#4FB7A5", "level": 3, "description": "Feeling indifferent, unresponsive, or lacking interest or enthusiasm towards something or someone. This emotion involves a lack of emotional or mental engagement." }
                    ]
                },
                {
                    "id": "busy",
                    "name": "Busy",
                    "color": "#4FB7A5",
                    "level": 2,
                    "description": "Feeling occupied with tasks, activities, or commitments that fill one's schedule or time. This emotion involves a sense of being actively engaged and productive.",
                    "children": [
                        { "id": "pressured", "name": "Pressured", "color": "#4FB7A5", "level": 3, "description": "Feeling stressed or compelled to meet expectations, deadlines, or obligations imposed by oneself or others. This emotion involves a sense of external or internal pressure to perform or achieve." },
                        { "id": "rushed", "name": "Rushed", "color": "#4FB7A5", "level": 3, "description": "Feeling hurried or pressed for time, often resulting in a sense of urgency or haste in completing tasks or reaching deadlines. This emotion involves a need to move quickly and efficiently." }
                    ]
                },
                {
                    "id": "stressed",
                    "name": "Stressed",
                    "color": "#4FB7A5",
                    "level": 2,
                    "description": "Feeling overwhelmed, anxious, or under pressure due to demanding circumstances or responsibilities. This emotion involves a heightened state of tension and worry.",
                    "children": [
                        { "id": "overwhelmed", "name": "Overwhelmed", "color": "#4FB7A5", "level": 5, "description": "Feeling overburdened, emotionally or mentally, by an excessive amount of tasks, responsibilities, or demands. This emotion involves a sense of being unable to cope or manage effectively." },
                        { "id": "out_of_control", "name": "Out of Control", "color": "#4FB7A5", "level": 4, "description": "Feeling powerless or unable to manage one's emotions, actions, or circumstances. This emotion involves a sense of chaos or disorder and a lack of ability to influence or change the situation." }
                    ]
                },
                {
                    "id": "tired",
                    "name": "Tired",
                    "color": "#4FB7A5",
                    "level": 2,
                    "description": "Feeling physically or mentally exhausted, often as a result of lack of sleep, overexertion, or prolonged stress. This emotion involves a lack of energy and a desire to rest or recuperate.",
                    "children": [
                        { "id": "sleepy", "name": "Sleepy", "color": "#4FB7A5", "level": 3, "description": "Feeling drowsy, tired, or in need of sleep. This emotion involves a strong desire to rest or sleep, often accompanied by difficulty staying awake or alert." },
                        { "id": "unfocused", "name": "Unfocused", "color": "#4FB7A5", "level": 3, "description": "Feeling unable to concentrate or pay attention, often resulting in a lack of clarity or direction. This emotion involves difficulty in maintaining focus or achieving goals." }
                    ]
                }
            ]
        }
    ]
}