
if object_id('tempdb..#temp_OUT') is not null drop table #temp_OUT
create table #temp_OUT(id int, value bit)

insert into #temp_OUT (id , value)
values  
(2, @menu_checkbox_2),
(3, @menu_checkbox_3),
(5, @menu_checkbox_5),
(6, @menu_checkbox_6),
(7, @menu_checkbox_7),
(8, @menu_checkbox_8),
(9, @menu_checkbox_9),
(10, @menu_checkbox_10),
(12, @menu_checkbox_12),
(13, @menu_checkbox_13),
(14, @menu_checkbox_14),
(16, @menu_checkbox_16),
(17, @menu_checkbox_17),
(18, @menu_checkbox_18),
(19, @menu_checkbox_19),
(20, @menu_checkbox_20),
(21, @menu_checkbox_21),
(22, @menu_checkbox_22),
(23, @menu_checkbox_23),
(24, @menu_checkbox_24),
(25, @menu_checkbox_25),
(26, @menu_checkbox_26),
(27, @menu_checkbox_27),
(28, @menu_checkbox_28),
(29, @menu_checkbox_29),
(30, @menu_checkbox_30),
(31, @menu_checkbox_31),
(32, @menu_checkbox_32),
(33, @menu_checkbox_33),
(34, @menu_checkbox_34),
(35, @menu_checkbox_35),
(36, @menu_checkbox_36),
(37, @menu_checkbox_37),
(38, @menu_checkbox_38),
(39, @menu_checkbox_39),
(40, @menu_checkbox_40),
(41, @menu_checkbox_41),
(42, @menu_checkbox_42),
(43, @menu_checkbox_43),
(44, @menu_checkbox_44),
(45, @menu_checkbox_45),
(46, @menu_checkbox_46),
(47, @menu_checkbox_47),
(48, @menu_checkbox_48),
(49, @menu_checkbox_49),
(50, @menu_checkbox_50),
(51, @menu_checkbox_51),
(52, @menu_checkbox_52),
(53, @menu_checkbox_53),
(54, @menu_checkbox_54),
(56, @menu_checkbox_56),
(57, @menu_checkbox_57),
(59, @menu_checkbox_59),
(60, @menu_checkbox_60),
(61, @menu_checkbox_61),
(62, @menu_checkbox_62),
(63, @menu_checkbox_63),
(64, @menu_checkbox_64),
(65, @menu_checkbox_65),
(66, @menu_checkbox_66),
(67, @menu_checkbox_67),
(68, @menu_checkbox_68),
(69, @menu_checkbox_69),
(70, @menu_checkbox_70),
(71, @menu_checkbox_71),
(72, @menu_checkbox_72),
(74, @menu_checkbox_74),
(75, @menu_checkbox_75),
(76, @menu_checkbox_76),
(77, @menu_checkbox_77),
(78, @menu_checkbox_78),
(79, @menu_checkbox_79),
(80, @menu_checkbox_80)

delete from #temp_OUT where value = 0

delete from [dbo].[ARM_MenuSystemLogin] where [UserId] = @UserId

insert into [dbo].[ARM_MenuSystemLogin] ([UserId],[ARM_MenuId])
select @UserId, id from #temp_OUT