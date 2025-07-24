export type DropdownOption = {
	label: string;
	value: string;
};

export interface DropdownProps {
	options: DropdownOption[];
	onRecentChange: (event: string) => void;
}

const optionsByLang: { [key: string]: DropdownOption[] } = {
	en: [
    { label: "Recent", value: "recent" },
    { label: "Preference", value: "preference" },
    { label: "Name Ascending", value: "ascending" },
    { label: "Name Descending", value: "descending" },
  ],
  US: [
    { label: "Recent", value: "recent" },
    { label: "Preference", value: "preference" },
    { label: "Name Ascending", value: "ascending" },
    { label: "Name Descending", value: "descending" },
  ],

  // Korean
  ko: [
    { label: "최근순", value: "recent" },
    { label: "선호도순", value: "preference" },
    { label: "이름 오름차순", value: "ascending" },
    { label: "이름 내림차순", value: "descending" },
  ],
  KR: [
    { label: "최근순", value: "recent" },
    { label: "선호도순", value: "preference" },
    { label: "이름 오름차순", value: "ascending" },
    { label: "이름 내림차순", value: "descending" },
  ],
  // (초기 데이터에 kr 코드도 있었으므로 유지)
  kr: [
    { label: "최근순", value: "recent" },
    { label: "선호도순", value: "preference" },
    { label: "이름 오름차순", value: "ascending" },
    { label: "이름 내림차순", value: "descending" },
  ],

  // German
  de: [
    { label: "Neueste", value: "recent" },
    { label: "Präferenz", value: "preference" },
    { label: "Name Aufsteigend", value: "ascending" },
    { label: "Name Absteigend", value: "descending" },
  ],
  DE: [
    { label: "Neueste", value: "recent" },
    { label: "Präferenz", value: "preference" },
    { label: "Name Aufsteigend", value: "ascending" },
    { label: "Name Absteigend", value: "descending" },
  ],

  // Spanish
  es: [
    { label: "Reciente", value: "recent" },
    { label: "Preferencia", value: "preference" },
    { label: "Nombre Ascendente", value: "ascending" },
    { label: "Nombre Descendente", value: "descending" },
  ],
  ES: [
    { label: "Reciente", value: "recent" },
    { label: "Preferencia", value: "preference" },
    { label: "Nombre Ascendente", value: "ascending" },
    { label: "Nombre Descendente", value: "descending" },
  ],

  // French
  fr: [
    { label: "Récent", value: "recent" },
    { label: "Préférence", value: "preference" },
    { label: "Nom Ascendant", value: "ascending" },
    { label: "Nom Descendant", value: "descending" },
  ],
  FR: [
    { label: "Récent", value: "recent" },
    { label: "Préférence", value: "preference" },
    { label: "Nom Ascendant", value: "ascending" },
    { label: "Nom Descendant", value: "descending" },
  ],

  // Italian
  it: [
    { label: "Più recenti", value: "recent" },
    { label: "Preferenza", value: "preference" },
    { label: "Nome Crescente", value: "ascending" },
    { label: "Nome Decrescente", value: "descending" },
  ],
  IT: [
    { label: "Più recenti", value: "recent" },
    { label: "Preferenza", value: "preference" },
    { label: "Nome Crescente", value: "ascending" },
    { label: "Nome Decrescente", value: "descending" },
  ],

  // Dutch
  nl: [
    { label: "Recent", value: "recent" },
    { label: "Voorkeur", value: "preference" },
    { label: "Naam Oplopend", value: "ascending" },
    { label: "Naam Aflopend", value: "descending" },
  ],
  NL: [
    { label: "Recent", value: "recent" },
    { label: "Voorkeur", value: "preference" },
    { label: "Naam Oplopend", value: "ascending" },
    { label: "Naam Aflopend", value: "descending" },
  ],

  // Japanese
  ja: [
    { label: "最新順", value: "recent" },
    { label: "好み順", value: "preference" },
    { label: "名前昇順", value: "ascending" },
    { label: "名前降順", value: "descending" },
  ],
  JP: [
    { label: "最新順", value: "recent" },
    { label: "好み順", value: "preference" },
    { label: "名前昇順", value: "ascending" },
    { label: "名前降順", value: "descending" },
  ],
  // (초기 데이터에 jp 코드도 있었으므로 유지)
  jp: [
    { label: "最新順", value: "recent" },
    { label: "好み順", value: "preference" },
    { label: "名前昇順", value: "ascending" },
    { label: "名前降順", value: "descending" },
  ],

  // Chinese (Simplified)
  zh: [
    { label: "最近", value: "recent" },
    { label: "偏好", value: "preference" },
    { label: "名称升序", value: "ascending" },
    { label: "名称降序", value: "descending" },
  ],
  CN: [
    { label: "最近", value: "recent" },
    { label: "偏好", value: "preference" },
    { label: "名称升序", value: "ascending" },
    { label: "名称降序", value: "descending" },
  ],

  // Chinese (Traditional / Taiwan)
  tw: [
    { label: "最近", value: "recent" },
    { label: "偏好", value: "preference" },
    { label: "名稱升序", value: "ascending" },
    { label: "名稱降序", value: "descending" },
  ],
  TW: [
    { label: "最近", value: "recent" },
    { label: "偏好", value: "preference" },
    { label: "名稱升序", value: "ascending" },
    { label: "名稱降序", value: "descending" },
  ],

  // Russian
  ru: [
    { label: "Недавние", value: "recent" },
    { label: "Предпочтение", value: "preference" },
    { label: "Имя по возрастанию", value: "ascending" },
    { label: "Имя по убыванию", value: "descending" },
  ],
  RU: [
    { label: "Недавние", value: "recent" },
    { label: "Предпочтение", value: "preference" },
    { label: "Имя по возрастанию", value: "ascending" },
    { label: "Имя по убыванию", value: "descending" },
  ],
};

const albumOptionsByLang: { [key: string]: DropdownOption[] } = {
	en: [
    { label: "Preference", value: "preference" },
    { label: "Name Ascending", value: "ascending" },
    { label: "Name Descending", value: "descending" },
  ],
  US: [
    { label: "Preference", value: "preference" },
    { label: "Name Ascending", value: "ascending" },
    { label: "Name Descending", value: "descending" },
  ],

  // Korean
  kr: [
    { label: "선호도순", value: "preference" },
    { label: "이름 오름차순", value: "ascending" },
    { label: "이름 내림차순", value: "descending" },
  ],
  ko: [
    { label: "선호도순", value: "preference" },
    { label: "이름 오름차순", value: "ascending" },
    { label: "이름 내림차순", value: "descending" },
  ],
  KR: [
    { label: "선호도순", value: "preference" },
    { label: "이름 오름차순", value: "ascending" },
    { label: "이름 내림차순", value: "descending" },
  ],

  // German
  de: [
    { label: "Präferenz", value: "preference" },
    { label: "Name Aufsteigend", value: "ascending" },
    { label: "Name Absteigend", value: "descending" },
  ],
  DE: [
    { label: "Präferenz", value: "preference" },
    { label: "Name Aufsteigend", value: "ascending" },
    { label: "Name Absteigend", value: "descending" },
  ],

  // Japanese
  jp: [
    { label: "好み順", value: "preference" },
    { label: "名前昇順", value: "ascending" },
    { label: "名前降順", value: "descending" },
  ],
  ja: [
    { label: "好み順", value: "preference" },
    { label: "名前昇順", value: "ascending" },
    { label: "名前降順", value: "descending" },
  ],
  JP: [
    { label: "好み順", value: "preference" },
    { label: "名前昇順", value: "ascending" },
    { label: "名前降順", value: "descending" },
  ],

  // French
  fr: [
    { label: "Préférence", value: "preference" },
    { label: "Nom Ascendant", value: "ascending" },
    { label: "Nom Descendant", value: "descending" },
  ],
  FR: [
    { label: "Préférence", value: "preference" },
    { label: "Nom Ascendant", value: "ascending" },
    { label: "Nom Descendant", value: "descending" },
  ],

  // Chinese (Simplified)
  zh: [
    { label: "偏好", value: "preference" },
    { label: "名称升序", value: "ascending" },
    { label: "名称降序", value: "descending" },
  ],
  CN: [
    { label: "偏好", value: "preference" },
    { label: "名称升序", value: "ascending" },
    { label: "名称降序", value: "descending" },
  ],
};

export function getDropdownOptions(lang: string): DropdownOption[] {
	return optionsByLang[lang] || optionsByLang.en;
}

export function getAlbumDropdownOptions(lang: string): DropdownOption[] {
	return albumOptionsByLang[lang] || albumOptionsByLang.en;
}


