export function setCookie(name: string, value: string, days: number) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}



export function getCookie(name: string): string | undefined {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';'); // 쿠키를 세미콜론으로 분리하여 배열 생성
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1,c.length); // 앞 공백 제거
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); // 쿠키 값 반환
    }
    return undefined; // 해당 이름의 쿠키가 없는 경우 undefined 반환
 }

export function deleteCookie(name: string): void {
// 쿠키의 만료일을 과거로 설정하여 삭제
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}