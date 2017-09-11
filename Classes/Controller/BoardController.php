<?php
namespace Datamints\DatamintsWorks\Controller;

use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

/***
 *
 * This file is part of the "Datamints Works" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2017 Christian Pschorr <c.pschorr@datamints.com>, datamints GmbH
 *
 ***/

/**
 * BoardController
 * @package DatamintsWorks
 */
class BoardController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
	/**
	 * boardRepository
	 *
	 * @var \Datamints\DatamintsWorks\Domain\Repository\BoardRepository
	 * @inject
	 */
	protected $boardRepository = null;

	/**
	 * Index action
	 *
	 * @param \Datamints\DatamintsWorks\Domain\Model\Board $board $board
	 * @return void
	 */
	public function indexAction(\Datamints\DatamintsWorks\Domain\Model\Board $board = null) {
		$this->view->assign('boards', $this->boardRepository->find());
		$this->view->assign('board', $board);
	}
}