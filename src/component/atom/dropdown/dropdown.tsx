"use client";

import React, { useState, useEffect } from "react";
import Icon from "../icon/Icon";
import style from "./dropdown.module.css";
import { DropdownProps } from "@/interface/DropdownType";

function Dropdown({ options, onRecentChange}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false); // 드롭다운이 열렸는지 여부
	const [selectedOption, setSelectedOption] = useState<string>( // 선택된 옵션
		options && options.length > 0 ? options[0].value : "" //초기값으로는 options 배열의 첫 번째 요소를 사용
	);
	const [data, setData] = useState<string[]>([]); // 드롭다운 데이터


	// 드롭다운을 토글하는 함수
	const toggleDropdown = () => setIsOpen(!isOpen);

	// 옵션 선택 핸들러
	const handleOptionClick = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
		// 옵션에 따른 데이터 정렬 로직 추가해야 함
		onRecentChange(option);
	};

	// 선택된 옵션의 라벨을 반환하는 함수
	const getLabelByValue = (value: string) => {
		const selected = options?.find((option) => option.value === value);
		return selected ? selected.label : "";
	};

	// 컴포넌트가 마운트될 때 데이터 로딩을 위한 useEffect 훅
	useEffect(() => {
		// 데이터 로딩 로직 추가해야 함
	}, []);

	return (
		<div className={style.dropdown}>
			<button
				className={`${style.toggleButton} ${isOpen ? style.active : ""}`}
				onClick={toggleDropdown}
			>
				{getLabelByValue(selectedOption)}
				<Icon iconName="arrowDownWhite" />
			</button>

			{isOpen && (
				<ul className={style.dropdownContent}>
					{options?.map((option, i) => (
						<li key={i} onClick={() => handleOptionClick(option.value)}>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;
