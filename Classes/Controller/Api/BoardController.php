<?php
namespace Datamints\DatamintsWorks\Controller\Api;

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

use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

/**
 * BoardController
 * @package DatamintsWorks
 */
class BoardController extends ApiController {

	/**
	 * @var \TYPO3\CMS\Extbase\Mvc\View\JsonView
	 */
	protected $view;

	/**
	 * @var string
	 */
	protected $defaultViewObjectName = \Datamints\DatamintsWorks\View\JsonView::class;

	/**
	 * boardRepository
	 *
	 * @var \Datamints\DatamintsWorks\Domain\Repository\BoardRepository
	 * @inject
	 */
	protected $boardRepository = null;

	/**
	 * Find action
	 *
	 * @return void
	 */
	public function findAction() {
		$this->view->setVariablesToRender(['boards', 'board']);

		$this->view->assign('boards', $this->boardRepository->find());
		$this->view->assign('board', $this->boardRepository->find()->getFirst());

//		DebuggerUtility::var_dump($this->boardRepository->find());
//		return true;
////		$this->view->assign('boards', $this->boardRepository->find());
	}
}