import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

function App() {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleFormSubmit = (nextState: ArticleStateType) => {
		setArticleState(nextState);
	};

	const handleFormReset = () => {
		handleFormSubmit(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}
				state={articleState}
			/>
			<Article />
		</main>
	);
}

export default App;
