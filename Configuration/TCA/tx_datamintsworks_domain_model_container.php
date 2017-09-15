<?php
return [
	'ctrl' => [
		'title' => 'LLL:EXT:datamints_works/Resources/Private/Language/locallang_db.xlf:tx_datamintsworks_domain_model_container',
		'label' => 'title',
		'label_userFunc' => \Datamints\DatamintsWorks\Service\Tca::class . '->getContainerTitle',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'sortby' => 'sorting',
		'versioningWS' => true,
		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => [
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		],
		'searchFields' => 'title,card',
		'iconfile' => 'EXT:datamints_works/Resources/Public/Icons/tx_datamintsworks_domain_model_container.gif'
	],
	'interface' => [
		'showRecordFieldList' => 'sys_language_uid, l10n_parent, l10n_diffsource, hidden, title, card',
	],
	'types' => [
		'1' => ['showitem' => 'sys_language_uid, l10n_parent, l10n_diffsource, hidden, title, card, --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.access, starttime, endtime'],
	],
	'columns' => [
		'sys_language_uid' => [
			'exclude' => true,
			'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.language',
			'config' => [
				'type' => 'select',
				'renderType' => 'selectSingle',
				'special' => 'languages',
				'items' => [
					[
						'LLL:EXT:lang/locallang_general.xlf:LGL.allLanguages',
						-1,
						'flags-multiple'
					]
				],
				'default' => 0,
			],
		],
		'l10n_parent' => [
			'displayCond' => 'FIELD:sys_language_uid:>:0',
			'exclude' => true,
			'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.l18n_parent',
			'config' => [
				'type' => 'select',
				'renderType' => 'selectSingle',
				'items' => [
					['', 0],
				],
				'foreign_table' => 'tx_datamintsworks_domain_model_container',
				'foreign_table_where' => 'AND tx_datamintsworks_domain_model_container.pid=###CURRENT_PID### AND tx_datamintsworks_domain_model_container.sys_language_uid IN (-1,0)',
			],
		],
		'l10n_diffsource' => [
			'config' => [
				'type' => 'passthrough',
			],
		],
		't3ver_label' => [
			'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.versionLabel',
			'config' => [
				'type' => 'input',
				'size' => 30,
				'max' => 255,
			],
		],
		'hidden' => [
			'exclude' => true,
			'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.hidden',
			'config' => [
				'type' => 'check',
				'items' => [
					'1' => [
						'0' => 'LLL:EXT:lang/locallang_core.xlf:labels.enabled'
					]
				],
			],
		],
		'starttime' => [
			'exclude' => true,
			'l10n_mode' => 'mergeIfNotBlank',
			'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.starttime',
			'config' => [
				'type' => 'input',
				'size' => 13,
				'eval' => 'datetime',
				'default' => 0,
			],
		],
		'endtime' => [
			'exclude' => true,
			'l10n_mode' => 'mergeIfNotBlank',
			'label' => 'LLL:EXT:lang/locallang_general.xlf:LGL.endtime',
			'config' => [
				'type' => 'input',
				'size' => 13,
				'eval' => 'datetime',
				'default' => 0,
				'range' => [
					'upper' => mktime(0, 0, 0, 1, 1, 2038)
				],
			],
		],

		'title' => [
			'exclude' => true,
			'label' => 'LLL:EXT:datamints_works/Resources/Private/Language/locallang_db.xlf:tx_datamintsworks_domain_model_container.title',
			'config' => [
				'type' => 'input',
				'size' => 30,
				'eval' => 'trim,required'
			],
		],

		// Bidirektionale Verbindungen zwischen Cards und Container
		// @see: http://www.typo3tiger.de/blog/post/typo3-bidirektionale-mm-relation-tca-extbase.html
		'card' => [
			'exclude' => true,
			'label' => 'LLL:EXT:datamints_works/Resources/Private/Language/locallang_db.xlf:tx_datamintsworks_domain_model_container.card',
			'config' => [
        'type' => 'group',
        'internal_type' => 'db',
				'allowed' => 'tx_datamintsworks_domain_model_card',
				'MM' => 'tx_datamintsworks_container_card_mm',
				'multiple' => 1,
        'fieldControl' => [
					'editPopup' => [
						'disabled' => false,
					],
					'addRecord' => [
						'disabled' => false,
						'pid' => '###CURRENT_PID###',
					],
					'listModule' => [
						'disabled' => false,
					],
					'elementBrowser' => [
						'disabled' => false,
					],
        ],
    	],
		],

		'board' => [
			'config' => [
				'type' => 'passthrough',
			],
		],
	],
];
