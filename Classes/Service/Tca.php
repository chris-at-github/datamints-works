<?php
namespace Datamints\DatamintsWorks\Service;

use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

class Tca {

	/**
	 * liefert den Titel fuer Container in Auflistungen
	 *
	 * @param array $parameter
	 * @param mixed $parent
	 * @return void
	 */
	public function getContainerTitle(&$parameter, $parent) {

		// Verknuepfung zum Board laden und dem eigentlichen Titel voranstellen
		if(empty($parameter['row']['board']) === false) {
			$board = \TYPO3\CMS\Backend\Utility\BackendUtility::getRecord('tx_datamintsworks_domain_model_board', (int) $parameter['row']['board']);

			if(empty($board) === false) {
				$parameter['title'] = $board['title'] . ' / ';
			}
		}

		$parameter['title'] .= $parameter['row']['title'];
	}
}