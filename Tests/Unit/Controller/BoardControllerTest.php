<?php
namespace Datamints\DatamintsWorks\Tests\Unit\Controller;

/**
 * Test case.
 *
 * @author Christian Pschorr <c.pschorr@datamints.com>
 */
class BoardControllerTest extends \TYPO3\CMS\Core\Tests\UnitTestCase
{
    /**
     * @var \Datamints\DatamintsWorks\Controller\BoardController
     */
    protected $subject = null;

    protected function setUp()
    {
        parent::setUp();
        $this->subject = $this->getMockBuilder(\Datamints\DatamintsWorks\Controller\BoardController::class)
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
    public function listActionFetchesAllBoardsFromRepositoryAndAssignsThemToView()
    {

        $allBoards = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->disableOriginalConstructor()
            ->getMock();

        $boardRepository = $this->getMockBuilder(\Datamints\DatamintsWorks\Domain\Repository\BoardRepository::class)
            ->setMethods(['findAll'])
            ->disableOriginalConstructor()
            ->getMock();
        $boardRepository->expects(self::once())->method('findAll')->will(self::returnValue($allBoards));
        $this->inject($this->subject, 'boardRepository', $boardRepository);

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $view->expects(self::once())->method('assign')->with('boards', $allBoards);
        $this->inject($this->subject, 'view', $view);

        $this->subject->listAction();
    }

    /**
     * @test
     */
    public function showActionAssignsTheGivenBoardToView()
    {
        $board = new \Datamints\DatamintsWorks\Domain\Model\Board();

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $this->inject($this->subject, 'view', $view);
        $view->expects(self::once())->method('assign')->with('board', $board);

        $this->subject->showAction($board);
    }
}
