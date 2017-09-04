<?php
namespace Datamints\DatamintsWorks\Tests\Unit\Controller;

/**
 * Test case.
 *
 * @author Christian Pschorr <c.pschorr@datamints.com>
 */
class CardControllerTest extends \TYPO3\CMS\Core\Tests\UnitTestCase
{
    /**
     * @var \Datamints\DatamintsWorks\Controller\CardController
     */
    protected $subject = null;

    protected function setUp()
    {
        parent::setUp();
        $this->subject = $this->getMockBuilder(\Datamints\DatamintsWorks\Controller\CardController::class)
            ->setMethods(['redirect', 'forward', 'addFlashMessage'])
            ->disableOriginalConstructor()
            ->getMock();
    }

    protected function tearDown()
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function listActionFetchesAllCardsFromRepositoryAndAssignsThemToView()
    {

        $allCards = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->disableOriginalConstructor()
            ->getMock();

        $cardRepository = $this->getMockBuilder(\Datamints\DatamintsWorks\Domain\Repository\CardRepository::class)
            ->setMethods(['findAll'])
            ->disableOriginalConstructor()
            ->getMock();
        $cardRepository->expects(self::once())->method('findAll')->will(self::returnValue($allCards));
        $this->inject($this->subject, 'cardRepository', $cardRepository);

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $view->expects(self::once())->method('assign')->with('cards', $allCards);
        $this->inject($this->subject, 'view', $view);

        $this->subject->listAction();
    }

    /**
     * @test
     */
    public function showActionAssignsTheGivenCardToView()
    {
        $card = new \Datamints\DatamintsWorks\Domain\Model\Card();

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $this->inject($this->subject, 'view', $view);
        $view->expects(self::once())->method('assign')->with('card', $card);

        $this->subject->showAction($card);
    }
}
