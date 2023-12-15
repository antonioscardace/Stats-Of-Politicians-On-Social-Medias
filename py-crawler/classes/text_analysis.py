from typing import List

from functools import reduce

from deep_translator import GoogleTranslator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Class for a basic text analysis.
# A good pipeline is to translate the text to English and then use VADER.
# Author: Antonio Scardace

class TextAnalysis:

    @staticmethod
    def translate(text: str) -> str:
        if not text.strip() or text.isnumeric(): return ''
        return GoogleTranslator(source='auto', target='en').translate(text) 

    @staticmethod
    def get_compound(text: str) -> float:
        vader = SentimentIntensityAnalyzer()
        return (vader.polarity_scores(text))['compound']
    
    @staticmethod
    def get_avg_sentiment(texts: List[str], n: int) -> float:
        texts = map((lambda text: TextAnalysis.translate(text)), texts)
        coms = map((lambda text: TextAnalysis.get_compound(text)), texts)
        return reduce((lambda curr, sum: curr + sum), coms) / n 
    
    @staticmethod
    def get_sentiment_mark(compound: float) -> str:
        if (compound) <= -0.05: return 'Negative'
        elif (compound) >= 0.05: return 'Positive'
        return 'Neutral'