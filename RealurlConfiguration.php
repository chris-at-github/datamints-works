<?php
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['realurl'] = array(
	'_DEFAULT' => array (
		'init' =>	array (
			'appendMissingSlash' => 'ifNotFile,redirect',
			'emptyUrlReturnValue' => '/',
		),
		'pagePath' =>	array (
			'rootpage_id' => '1',
		),
		'fileName' =>	array (
			'defaultToHTMLsuffixOnPrev' => 0,
			'acceptHTMLsuffix' => 1,
			'index' =>
			array (),
		),

'fixedPostVars' => array(
	'worksBoard' => array(
		array(
			'GETvar' => 'tx_datamintsworks_frontend[action]',
			'valueMap' => array(
				'index' => '',
			),
			'noMatch' => 'bypass'
		),
		array(
			'GETvar' => 'tx_datamintsworks_frontend[controller]',
			'valueMap' => array(
				'Board' => '',
			),
			'noMatch' => 'bypass'
		),
		array(
			'GETvar' => 'tx_datamintsworks_frontend[board]',
			'lookUpTable' => array(
				'table' => 'tx_datamintsworks_domain_model_board',
				'id_field' => 'uid',
				'alias_field' => null,
				'addWhereClause' => ' AND NOT deleted',
				'useUniqueCache' => 1,
				'useUniqueCache_conf' => array(
					'strtolower' => 1,
					'spaceCharacter' => '-'
				),
				'languageGetVar' => 'L',
				'languageExceptionUids' => '',
				'languageField' => 'sys_language_uid',
				'transOrigPointerField' => 'l10n_parent',
				'expireDays' => 180,
			)
		)
	),

	5 => 'worksBoard'
),

		'postVarSets' => array(
			'_DEFAULT' => array(
				// 'works' => array(
				// 	array(
				// 		'GETvar' => 'tx_datamintsworks_frontend[action]',
				// 	),
				// 	array(
				// 		'GETvar' => 'tx_datamintsworks_frontend[controller]',
				// 	),
				// 	array(
				// 		'GETvar' => 'tx_datamintsworks_frontend[board]',
				// 		'lookUpTable' => array(
				// 			'table' => 'tx_datamintsworks_domain_model_board',
				// 			'id_field' => 'uid',
				// 			'alias_field' => null,
				// 			'addWhereClause' => ' AND NOT deleted',
				// 			'useUniqueCache' => 1,
				// 			'useUniqueCache_conf' => array(
				// 				'strtolower' => 1,
				// 				'spaceCharacter' => '-',
				// 			),
				// 			'languageGetVar' => 'L',
				// 			'languageExceptionUids' => '',
				// 			'languageField' => 'sys_language_uid',
				// 			'transOrigPointerField' => 'l10n_parent',
				// 			'expireDays' => 180,
				// 		),
				// 	),
				// ),
			),
		),
	),
);