from django.urls import path
from .views import FinancialEntryListCreateView, FinancialEntryTotalView, ExpenseEntryListCreateView, ExpenseEntryTotalView, FinancialExpenseSummaryView,FinancialGoalListCreateView,FinancialGoalDetailView,UserFinancialGoalListView,UpdateFinancialGoalView,FinancialGoalDeleteView

urlpatterns = [
    path('financial-entries/', FinancialEntryListCreateView.as_view(), name='financial-entry-list-create'),
    path('financial-entries/total/<int:period>/', FinancialEntryTotalView.as_view(), name='financial-entry-total'),

    path('expense-entries/', ExpenseEntryListCreateView.as_view(), name='expense-entry-list-create'),
    path('expense-entries/total/<int:period>/', ExpenseEntryTotalView.as_view(), name='expense-entry-total'),

    path('financial-expense-summary/<int:period>/', FinancialExpenseSummaryView.as_view(), name='financial-expense-summary'),
    path('financial-goals/', FinancialGoalListCreateView.as_view(), name='financial-goal-list-create'),
    path('financial-goals/<int:pk>/', FinancialGoalDetailView.as_view(), name='financial-goal-detail'),
    path('financial-goals/<int:pk>/delete/', FinancialGoalDeleteView.as_view(), name='financial-goal-delete'),
    path('financial-goals/update/<int:pk>/', UpdateFinancialGoalView.as_view(), name='update-financial-goal'),
    path('user-financial-goals/<int:user_id>/', UserFinancialGoalListView.as_view(), name='user-financial-goals'),
]
