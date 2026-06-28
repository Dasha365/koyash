# Customer Review Transcript — Sprint 2 (Assignment 4)

**[00:00]**

Team: First, I'll briefly tell you what we've been working on this week. We've finalized the MVP, made improvements, applied all the design changes, copied the modifications to the frontend, added automated tests for product filtering logic, and added skin type to the database, taking it into account during filtering.

Customer: I've had a quick look at Figma, made one comment, and had to rush off to a meeting, so I have a few corrections to make.

**[00:45]**

Team: We're about to showcase our working MVP. We didn't have time to fix the frontend, so it's a bit crooked right now, but it'll be like in Figma later.

Customer: It's okay, don't worry. Where should I swipe?

Team: You can swipe down, or you can immediately click on the selection. We have three acceptance tests for users, and you can go through them all and tell us if there are any issues or if something doesn't work as expected.

Customer: Why are there three of them?

Team: Three tests, because the task requires three acceptance tests. This means that you need to complete the task three times.

Customer: Okay, I saw what you sent me, and I'll look at it today or tomorrow.

**[02:00]**

Team: The first step is to fill out the questionnaire and receive a personalized set of cosmetics. This means that you need to open the questionnaire, mark all the questions, and indicate the expected result of receiving the cosmetics.

Customer: What do I need to do? Just complete the questionnaire three times?

Team: Yes.

Customer: Everything is fine, and how about the quality of the recommendations?

Team: Yes.

Customer: OK. Is it moving, or is it just me? It's better to keep it static, I think.

Team: We're experimenting.

Customer: Please experiment. It's no problem at all. It's better to redesign this part, because I want to click on it, and I'm wondering why it's not clicking.

Team: It should be different, but we didn't have enough time to finish it.

Customer: It's okay, it just feels like a button. It seems to be broken.

Team: Is it not loading? Is it a white screen?

Customer: Yes.

Team: I don't know what the problem is, sometimes it works, sometimes it doesn't.

**[05:30]**

Customer: Let's try it again. Oh, it worked, maybe there's a problem with the filtering, because I've only selected the simplest options, but in the past, I've selected more. So it's probably a filtering issue. The total doesn't work.

Team: The total doesn't work, and it says at the bottom that it couldn't find any products that match these categories. We can make it display an empty list. Because there's no low segment in the dataset for a category like toning.

Customer: No?

Team: No.

Customer: Then it's better to remove it, yes. If it doesn't fit the budget, then remove the toning.

Team: So should we focus on the budget or the product category?

Customer: Look, we don't focus on luxury products because there aren't many luxury products, as I see it. Either we increase the range for the average budget, or we simply remove the toning as a workaround.

Team: It is possible for the algorithm to try to select from the highest categories initially, until it reaches the price, in which case it will try to select the minimum value.

**[08:30]**

Customer: I need it to match all the filters. I'm really interested in how you'll approach this, but I'm not good with algorithms. Oh, it even takes me to the Golden Apple website, which is cool. Is this the first time I've passed?

Team: Yes.

Customer: Let me try it again.

**[10:00]**

Team: You can mark an allergy and then make sure that there is no declared allergen in the recommended products.

Customer: Let's try it. I still want to poke it, and I need to test it on several users. Does not work.

Team: Is the screen white again?

Customer: Yes, let me try again as quickly. No, it's still a white screen. And it shows a white screen right after the price segment. Is there anything after it?

Team: Yes, there is.

Customer: Is the price the last thing?

Team: No, it's halfway through.

Customer: Let's try again.

**[12:00]**

Team: So it's not a filtering issue.

Customer: Yes.

Team: It works for me, you can try it on another laptop.

Customer: Let's try it. Oh, wait, this is the basic version, not the story version.

Team: It's a story, isn't it?

Customer: No, I went through the basic, it worked for me, but with the story it falls.

Team: In general, the logic of selection is the same in both versions, so you can do it for now.

**[13:30]**

Customer: By age, too, it will be necessary to do for the backend. Maybe it will just be needed for statistics. It will be necessary to make the boundaries, a person can specify that he is a thousand years old. It will be necessary to specify. White screen again.

Team: This is on short or long.

Customer: On long, short works fine. The long one falls after the price.

Team: Let's just do the short one then.

**[15:30]**

Customer: When do you have the project presentation?

Team: On Monday.

Customer: What time?

Team: At 2:20 p.m., during our lab session. Lab session from 2:20 p.m. to 3:50 p.m., in room 461.

Customer: Great, I might come by, just to have a look. It's all right, there are some comments on the design. I realized that you had a big problem with the gradient. Is it bad now? Not what you wanted?

**[16:30]**

Team: Yes.

Customer: I'd like to see a reference to understand it. Please send me a reference for the landing page in a private message, and I'll send it to you today.

Team: We were just trying to make it full-screen, with a white circle in the middle, but either the text is hard to see or it's too orange and too colorful.

Customer: There's a chance that there might be spots, so I need to think about it.

Team: I can show you this one, but it's not as clear.

Customer: These are the spots. It looks a bit dirty.

Team: So we need to change the gradient again. He looks cool.

Customer: It looks too strong.

Team: If we make it weaker, try it.

Customer: The transition is too sharp.

Team: Is that how it looks for you? It looks different for me. It's softer for me.

Customer: It's very sharp, and we can see the border. I don't want it to fill the entire screen. I like it better like this.

Team: Maybe we can do it without the border, in a minimalist way?

Customer: I found a reference, and you can see it's neat.

Team: It's almost invisible.

Customer: Yes, it creates a sense of color when there is no actual color.

Team: We have many bright elements that create a sense of color.

Customer: Then you can leave it as it is.

Team: We will try again.

**[21:00]**

Customer: You can try it, but don't spend too much time on it, it's not a priority. And about the landing page — if you're in Figma right now, you'll see this thing. Remember what I told you about the research part, why you can trust Koyash, "every choice is used," it's literally here. It's the same thing. Look, here's a moment, look above, "Koyash doesn't create cosmetics, it's not tied to a single brand," go down, "we don't produce cosmetics," it's a repetition. That is, it is important to show why you can really trust us — I refer to the technical specifications, there is at the bottom. You can write, and I will formulate it a little more clearly for you. You can write to me to clarify.

Team: Then we will correct this block of text.

**[23:00]**

Customer: Yes, here it's one hundred percent to change. How are things in the team in general?

Team: Mostly good.

Customer: You're more positive than you were at the first meeting. Overall, it's good.

**[23:30]**

Team: And what about this brushstroke here?

Customer: I'm thinking about it too. Can we remove this gradient for now? It's a bit challenging for me. Overall, it's not bad. The contrast seems a bit off. I don't like how "Enter History" is so graphic, while we have a brushstroke. The graphic in the brushstroke doesn't look cohesive.

Team: Maybe we can redo it, remove this smudge, and try it again.

Customer: You can try it. You can add me or yourself to the contacts, if you want.

Team: To open the Telegram chat?

Customer: Yes, or use email. In general, all the comments are valid, but you need to work on the "why you can trust Koyash" part.

**[25:30]**

Team: Will you need an account system?

Customer: Yes, it's better to store it in a database. Just don't use Outlook for authorization.

**[26:00]**

Team: Do you like the pictures in the story?

Customer: To be honest, I didn't notice. If I didn't notice, then everything is great.

**[26:30]**

Team: Okay, now we need to choose between a story with a logo on top and a story without a logo on top. We need to decide which one is better.

Customer: Why can't we just make the top part smaller?

Team: Okay, let's make it smaller. Or maybe we should remove the logo?

Customer: That's a good question.

Team: It takes up half of the screen on my laptop, and it looks really weird.

Customer: Here's an example, see the small strip and the little thing on top?

Team: Like this.

Customer: Like this. Let's play with the text. Let's comment on the amount of text in one question.

**[28:00]**

Team: Is there a lot of text?

Customer: Yes, on one slide. If we take a story, how many slides are there?

Team: 15, but we count 14. We can remove three tips.

Customer: No, with tips. Okay, you'll refine the text a little later, but it feels like there's a lot of text. We can split it up a bit.

Team: We also had an idea to offer a mini questionnaire if someone doesn't know their skin type.

Customer: That's a great idea.

Team: So, which story is better?

Customer: With the logo — if they're going to take a screenshot, it would be nice to have a label.

**[29:30]**

Team: Okay, let's make it smaller. Now, the second choice. A short questionnaire with pictures, or a short questionnaire with too many rectangles? It turns out that it's just a truncated story without any advice.

Customer: If we say "short" and insert a lot of text, it's no longer short.

Team: We can leave the question and the answer option on the short questionnaire.

Customer: Yes, it's just more visually appealing.

Team: Then let's remove the text.

Customer: Yes, you can just adjust the text, remove the solid piece, and make the top smaller. You can also make it smaller in the cosmetic-bag section.

**[31:00]**

Team: It's possible to make it always appear at the end, so that it remains static when you scroll. Alternatively, it can disappear.

Customer: Let it disappear, there's no need for it to be static. If you add a button on top, it will be fine, as it's a bit empty.

Team: We can add an account login.

Customer: Yes, that's great.

**[32:00]**

Team: There's also a question about "you" and "your." On the landing page, we use "you" from the beginning, and it's in the feminine form.

Customer: I think we can ask the gender at the very beginning. Well, yes, it's a women's story.

Team: Are we on a first-name basis or on a formal basis?

Customer: Please write to me about this question, and I'll probably read some research, because it's not just my personal preference; it requires some investigation. It doesn't really matter to me, but it's a philosophical question. Are we done?

Team: Yes, thank you.

**[33:00]** — End of recording.
