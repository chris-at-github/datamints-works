<?php
namespace Datamints\DatamintsWorks\Controller;

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
 * CardController
 */
class CardController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * cardRepository
     * 
     * @var \Datamints\DatamintsWorks\Domain\Repository\CardRepository
     * @inject
     */
    protected $cardRepository = null;

    /**
     * action list
     * 
     * @return void
     */
    public function listAction()
    {
        $cards = $this->cardRepository->findAll();
        $this->view->assign('cards', $cards);
    }

    /**
     * action show
     * 
     * @param \Datamints\DatamintsWorks\Domain\Model\Card $card
     * @return void
     */
    public function showAction(\Datamints\DatamintsWorks\Domain\Model\Card $card)
    {
        $this->view->assign('card', $card);
    }
}
