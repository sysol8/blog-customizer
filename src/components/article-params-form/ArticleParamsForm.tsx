import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef, FormEventHandler } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { clsx } from 'clsx';

interface ArticleParamsFormProps {
	onSubmit: (values: ArticleStateType) => void;
	onReset: () => void;
	state: ArticleStateType;
}

export const ArticleParamsForm = ({
	onSubmit,
	onReset,
	state,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const [values, setValues] = useState<ArticleStateType>(state);

	useEffect(() => {
		setValues(state);
	}, [state]);

	const handleSelect =
		<K extends keyof ArticleStateType>(name: K) =>
		(option: ArticleStateType[K]) => {
			setValues((prev) => ({ ...prev, [name]: option }));
		};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onSubmit(values);
	};

	const handleReset: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setValues(state);
		onReset();
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: containerRef,
		onChange: () => setIsMenuOpen(false),
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={(e: ReactMouseEvent<HTMLDivElement>) => {
					e.stopPropagation();
					setIsMenuOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={containerRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as={'h2'}
						weight={800}
						size={31}
						uppercase={true}
						family={'open-sans'}>
						Задайте параметры
					</Text>
					<Select
						selected={values.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleSelect('fontFamilyOption')}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={values.fontSizeOption}
						title='Размер шрифта'
						onChange={handleSelect('fontSizeOption')}
					/>
					<Select
						selected={values.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleSelect('fontColor')}
					/>
					<Separator />
					<Select
						selected={values.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleSelect('backgroundColor')}
					/>
					<Select
						selected={values.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleSelect('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
