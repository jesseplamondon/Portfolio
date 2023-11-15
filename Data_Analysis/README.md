## Project Overview

In this project, a comprehensive model has been developed to evaluate shot quality, goalie performance, and the value each goalie brings to their team. The primary output is the "goalies_GSAA.csv" file, containing metrics such as Save Percentages Above Average per Shot Quality (SPAAsq) and Goals Saved Above Average (GSAA) for each goalie.

## Key Features

- **Shot Quality Modeling:** Creating a model to assess the quality of shots in the 2022-23 NHL season.
- **Goalie Performance Metrics:** Calculating Save Percentages Above Average, Goals Saved Above Average, and overall GSAA.
- **Team Evaluation:** Determining the value and cap efficiency of each team's goalie tandem.
- **Comparative Analysis:** Evaluating goalie performance by comparing the impact of different goalies on the same shots faced.

## Functions and Tools

The project includes several functions and tools:

- `get_GSAR_by_names(df, averages, name1, name2)`: Compares the GSAA of two goalies based on the shots faced by goalie1.
- `get_goalie_SPAAsq`: Determines specific save percentages in shot quality areas.
- `get_all_GSAA`: Evaluates goalie performance based on all shots faced in the season.

## Value per Million Evaluation

The model assesses each goalie's Value per Million, providing insights into the value a goalie brings to their team based on salary, GSAA, and games played. This metric is used to evaluate and compare the value/cap efficiency of each team's goalie tandem from the 2022-23 season.

## Model Testing

A thorough test of the model and functions was conducted by comparing the performance of Andrei Vasilevskiy on shots faced by Brian Elliott in the 2022-23 season.

## Future Improvements

This model can be further enhanced by incorporating data from additional seasons/players to refine shot quality groups and goalie evaluations. Future improvements could also include evaluating shot takers and their associated goal-scoring averages with different shot quality areas.

## Technologies Used

- **Python:** Leveraged for data analysis and processing.

## Getting Started

To explore the project:

1. Clone the repository: `git clone https://github.com/your-username/nhl-prospects.git]ttps://github.com/jesseplamondon/Portfolio.git`
2. Navigate to the project directory: `cd Data_Analysis`
3. Dive into the code and model: Open the project with your preferred Python environment.

## License

This project is licensed under the MIT License. For detailed information, refer to the [LICENSE](LICENSE) file.


