import Main from "@/component_RS/template/Main";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function recommandPage({ params }: { params: { id: string } }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks

	return (
		<div className="mainPage">
			<Main slug={`${params.id}`} />
		</div>
	);
}
