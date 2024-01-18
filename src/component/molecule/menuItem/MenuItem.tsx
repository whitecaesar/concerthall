"use client";

import Link from "next/link";
import Icon from "@/component/atom/icon/Icon";

interface MenuItemProps {
	href: string;
	iconName: string;
	children: string;
	onClick: () => void;
}

function MenuItem({ href, iconName, children, onClick }: MenuItemProps) {
	return (
		<>
			<li className="menuItem" onClick={onClick}>
				<Link href={href}>
					<Icon iconName={iconName} />
					{children}
					<Icon iconName="arrowRightWhite" />
				</Link>
			</li>
			<style jsx>{`
				.menuItem {
					height: 55px;
					border-bottom: 1px solid var(--borderDark);
					a {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						width: 100%;
						height: 100%;
						padding: 15px;
						i:first-of-type {
							width: 18px;
							height: 18px;
							margin-right: 15px;
						}
						i:last-of-type {
							position: absolute;
							right: 15px;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			`}</style>
		</>
	);
}

export default MenuItem;
