 /* EXECUTE avr_Chart_Claims_Off*/

 select 
        'Заявки з відключеннями' as Name,
        23 as Switch_Off_object 		-- Відключені об'єкти
		,5 as Switch_Off_object_time 	-- Місця термін відключення яких спливає
		,32 as Claim_with_off 			-- Заявки з відключеннями
		,7 as Claim_with_off_time 	-- Заявки з місцями термін відключення яких спливає
		,8 as Claim_time 				-- Заявки з відключеннями, строк виконання яких (заявок) спливає
