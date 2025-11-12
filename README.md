# Solvent-Ratio-Analysis

A ratio calculator to determine levels of chemicals when compared to a main peak and its relationship to a diluent peak from a separate list.

Sometimes when looking at GC results, the main diluent peak is so high that all other peaks are hidden in the baseline other than maybe one other larger peak. This calculator takes the relationship between those peaks and finds the ratio between them.
This ratio can then be used when comparing a separate instance of a run where the main diluent peak has been removed so that the levels of all the other peaks are larger in comparison to the original, but there relationship to the comparison peak is still the same (relatively speaking) and can adjust the levels of all peaks across the board.

For example, we have two runs, one with a diluent peak and one without. The first run consists of two peaks: Diluent = 80, Main comparison peak (MCP) = 20. Great, but we cant see any other peaks..
however, if we run the sample again and block out the Diluent peak we get more results: Main comparison peak = 60, Chem1 = 20, Chem2 = 10 & Chem3 = 10.
Now we can use these numbers and their relationship with the logic in the calculator to find the relationship between the Chem(n) peaks and the original diluent peak... hopefully!

We do this by following these steps:
 - Find the ratio between the diluent peak and the main comparison peak. So 20/80 = 0.25
 - Now find the ratio between each Chem(n) peak and the main comparison peak (not including the diluent peak). So 20/60 = 0.3, 10/60 = 0.1667
 - Take each Chem value and multiply it by the ratio between itself and the main comparison peak, and then again by the ratio of the main comparison peak and the diluent.
 - For example Chem1 = 20. MCP = 60, 20/60 = 0.3334 * Chem1 = 6.667 and MCP when compared to the Diluent = 20/80 = 0.25. So 6.667/0.25 = 1.6667
 - Do this for each Chem in the list, then total their values. If we use the numbers given on line 8 we get 1.6667, 0.41667 & 0.41667 for a total of 2.5
 - Take that total and subtract it from the total given by the first run that consists of the Diluent and MCP values. In this example we had (80 + 20 = 100) - 2.5 = 97.5
 - Divide that by 100 to give us the new ratio we need to multply those original values by. So 80 * 0.975 = 78, 20 * 0.975 = 19.5
 - Finally the new values will be Diluet = 78, MCP = 19.5, Chem1 = 1.6667, Chem2 = 0.41667 & Chem3 = 0.41667 for a total of 100

This is how we can use both runs to find the ratios between a large diluent peak and the small Chem peaks hidden in the baseline by relying on their relationship to a common peak, in this case the MCP.

If the maths is wrong I will come back and adjust... or delete forever.
